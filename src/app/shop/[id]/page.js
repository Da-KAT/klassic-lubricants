import { PRODUCTS } from '@/app/data/products'
import Nav from '@/components/Nav'
import ProductClient from './ProductClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) return {}
  return {
    title: `${product.name} — Klassic Lubricants`,
    description: `${product.brand} ${product.name}. Available in ${product.sizes.join(', ')}. Contact Klassic Lubricants for pricing and availability.`,
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) notFound()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Nav />
      <ProductClient product={product} />
    </main>
  )
}