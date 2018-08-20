import Orders from '../models/order'
import Product from '../models/product'
import Cart from '../models/cart'
import { formatMoney } from 'accounting'

exports.home = (req, res) => {
  // Get all active orders
  Orders.find(
    {
      active: true
    },
    (err, orders) => {
      if (err) {
        res.render('order/index', {
          error: req.flash('error')
        })
      } else {
        let displayPrices = orders.map(x => formatMoney(x.cart.totalPrice))
        res.render('order/index', {
          orders: orders,
          prices: displayPrices,
          success: req.flash('success'),
          error: req.flash('error'),
          title: 'All Orders'
        })
      }
    }
  ).sort({
    created_at: -1
  })
}

exports.view = (req, res) => {
  const orderId = req.params.id
  Orders.findById(orderId)
    .populate('docket')
    .exec()
    .then(order => {
      let cart = new Cart(order.cart)
      let verif = req.session.verified
      req.session.verified = null
      res.render('order/view', {
        products: cart.generateArray(),
        totalPrice: formatMoney(cart.totalPrice),
        displayPrices: cart.makeDisplayPrices(),
        totalQty: cart.totalQty,
        order: order,
        session: req.session,
        verified: verif,
        success: req.flash('success'),
        error: req.flash('error')
      })
    })
    .catch(err => {
      let error = err.message || 'Could not find that order'
      req.flash('error', error)
      res.redirect('/orders')
    })
}

exports.history = (req, res) => {
  const user = req.session.user._id
  Orders.find(
    {
      'sender.id': user
    },
    (err, orders) => {
      if (err) {
        res.render('order/index', {
          error: req.flash('error')
        })
      } else {
        let displayPrices = orders.map(x => formatMoney(x.cart.totalPrice))
        res.render('order/index', {
          orders: orders,
          prices: displayPrices,
          success: req.flash('success'),
          title: 'Your Orders'
        })
      }
    }
  ).sort({
    created_at: -1
  })
}

exports.checkout = (req, res) => {
  const curOrder = req.params.id

  Orders.findById(curOrder)
    .then(order => {
      let cartItems = Object.values(order.cart.items)
      let filteredCart = cartItems.filter(
        item => item.item.quantity < item.qty
      )
      if (filteredCart.length <= 0) {
        return cartItems
      } else {
        filteredCart.forEach(product => {
          throw new Error(`Only ${product.item.quantity} "${product.item.name}" in stock`)
        })
      }
    })
    .then(items => {
      return updateItems(items)
    })
    .then(newItems => {
      return deactivateOrder(curOrder, req.session.user)
    })
    .then(newOrder => {
      req.session.verified = null
      req.flash('success', 'Order completed!')
      res.redirect('/orders/' + curOrder)
    })
    .catch(err => {
      req.flash('error', err)
      res.redirect('/orders/' + curOrder)
    })
}

/**
 * updates item quantities
 *
 * @param {*} items
 * @returns array of updated items
 */
const updateItems = async function (items) {
  let newItems = []
  for (let product of items) {
    let newQty = product.item.quantity - product.qty
    let newItem = await Product.findByIdAndUpdate(
      product.item._id,
      {
        quantity: newQty
      },
      { new: true }
    )
    newItems.push(newItem)
  }
  return newItems
}

/**
 * deactivates order
 *
 * @param {*} order
 * @param {*} user
 * @returns deactivated order
 */
const deactivateOrder = async function (order, user) {
  let nOrder = await Orders.findOneAndUpdate(
    {
      _id: order
    },
    {
      $set: {
        active: false,
        dispenser: user
      }
    },
    {
      sort: {
        _id: -1
      }
    }
  )
  return nOrder
}

exports.delete = (req, res) => {
  Orders.findByIdAndRemove(req.params.id, (err, order) => {
    if (err) {
      req.flash('error', 'Could not remove order at this time')
      res.redirect('/orders/history')
    } else if (order) {
      req.flash('success', 'Order removed')
      res.redirect('/orders/history')
    }
  })
}
