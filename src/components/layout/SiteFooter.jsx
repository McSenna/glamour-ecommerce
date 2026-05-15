import { Link } from 'react-router-dom'
import { APP_NAME } from '@/lib/constants'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-glamour-100 bg-glamour-50/80">
      <div className="mx-auto flex max-w-8xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-sm space-y-4">
          <p className="font-display text-2xl text-glamour-950">{APP_NAME}</p>
          <p className="text-sm text-glamour-600">
            A calm marketplace for elevated home living — curated accents, lighting, and essentials from
            independent makers.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm text-glamour-600 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-glamour-900">Discover</p>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-glamour-900" to="/shop">
                  Shop all
                </Link>
              </li>
              <li>
                <Link className="hover:text-glamour-900" to="/shop?category=lighting-decorations">
                  Lighting
                </Link>
              </li>
              <li>
                <Link className="hover:text-glamour-900" to="/shop?category=kitchen-essentials">
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-glamour-900">Sell</p>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-glamour-900" to="/seller">
                  Seller hub
                </Link>
              </li>
              <li>
                <Link className="hover:text-glamour-900" to="/auth/register">
                  Open a shop
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-glamour-900">Care</p>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-glamour-900" to="/account/orders">
                  Orders
                </Link>
              </li>
              <li>
                <span className="text-glamour-400">Support (demo)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-glamour-100 py-6 text-center text-xs text-glamour-500">
        © {new Date().getFullYear()} {APP_NAME}. Boilerplate for IPT2 — design and architecture demo.
      </div>
    </footer>
  )
}
