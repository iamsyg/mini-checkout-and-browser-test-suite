
import { useRef, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Wireless Mouse", price: 799 },
  { id: 2, name: "Mechanical Keyboard", price: 1499 },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  // Prevent multiple submissions before React re-renders
  const orderLock = useRef(false);

  const addToCart = (product) => {
    if (orderLock.current) return;

    setError("");

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    if (orderLock.current) return;

    setError("");

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    if (orderLock.current) return;

    setError("");
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    // Ignore duplicate submissions
    if (orderLock.current) return;

    if (cart.length === 0) {
      setError("Your cart is empty. Please add a product.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name before placing the order.");
      return;
    }

    // Lock immediately, before React re-renders
    orderLock.current = true;

    const reference = `ORD-${Date.now()}`;

    setOrder({
      reference,
      customer: name.trim(),
      total,
      items: cart,
    });

    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Simple Checkout
        </h1>
        <p className="mb-8 text-gray-500">
          Add your products and complete your order.
        </p>

        {order ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <div className="mb-4 text-5xl">✓</div>

            <h2
              data-testid="order-confirmation"
              className="mb-3 text-2xl font-bold text-green-700"
            >
              Order placed successfully!
            </h2>

            <p className="text-gray-600">
              Thank you, {order.customer}.
            </p>

            <p className="mt-4 text-gray-700">
              Order Reference:
              <strong data-testid="order-reference" className="ml-2">
                {order.reference}
              </strong>
            </p>

            <p className="mt-3 text-lg font-semibold">
              Total: ₹{order.total.toFixed(2)}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">

            {/* Products */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Available Products
              </h2>

              <div className="space-y-4">
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 border-b pb-4"
                  >
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-500">
                        ₹{product.price}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Cart and Checkout */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Your Cart
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-500" data-testid="empty-cart">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border-b pb-4"
                    >
                      <div className="flex justify-between gap-2">
                        <h3 className="font-medium">{item.name}</h3>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-600"
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{item.price} × {item.quantity} =
                        {" "}₹{item.price * item.quantity}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="rounded border px-3 py-1"
                        >
                          -
                        </button>

                        <span
                          data-testid={`quantity-${item.id}`}
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="rounded border px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Total */}
              <div className="mt-6 flex justify-between border-t pt-4">
                <span className="font-semibold">Order Total</span>

                <span
                  data-testid="order-total"
                  className="text-lg font-bold"
                >
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {/* Customer Details */}
              <div className="mt-6">
                <label
                  htmlFor="customer-name"
                  className="mb-2 block font-medium"
                >
                  Customer Name *
                </label>

                <input
                  id="customer-name"
                  data-testid="customer-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Validation Message */}
              {error && (
                <p
                  role="alert"
                  data-testid="validation-error"
                  className="mt-4 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {/* Place Order */}
              <button
                onClick={placeOrder}
                disabled={!!order}
                className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                Place Order
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
