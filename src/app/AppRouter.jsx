import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { RequireAuth } from '@/app/RequireAuth'
import { HomePage } from '@/pages/HomePage'
import { ShopPage } from '@/pages/ShopPage'
import { ProductPage } from '@/pages/ProductPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { AccountPage } from '@/pages/account/AccountPage'
import { OrdersPage } from '@/pages/account/OrdersPage'
import { OrderTrackingPage } from '@/pages/OrderTrackingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SellerLayout } from '@/pages/seller/SellerLayout'
import { SellerDashboardPage } from '@/pages/seller/SellerDashboardPage'
import { SellerProductsPage } from '@/pages/seller/SellerProductsPage'
import { SellerOrdersPage } from '@/pages/seller/SellerOrdersPage'
import { SellerAnalyticsPage } from '@/pages/seller/SellerAnalyticsPage'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { AdminSellersPage } from '@/pages/admin/AdminSellersPage'
import { AdminModerationPage } from '@/pages/admin/AdminModerationPage'

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-glamour-200 border-t-glamour-900" />
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/seller" element={<RequireAuth roles={['seller']} children={<SellerLayout />} />}>
          <Route index element={<SellerDashboardPage />} />
          <Route path="products" element={<SellerProductsPage />} />
          <Route path="orders" element={<SellerOrdersPage />} />
          <Route path="analytics" element={<SellerAnalyticsPage />} />
        </Route>

        <Route path="/admin" element={<RequireAuth roles={['admin']} children={<AdminLayout />} />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="sellers" element={<AdminSellersPage />} />
          <Route path="moderation" element={<AdminModerationPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route
            path="orders/track/:trackingId"
            element={
              <RequireAuth>
                <OrderTrackingPage />
              </RequireAuth>
            }
          />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="account" element={<RequireAuth />}>
            <Route index element={<AccountPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
