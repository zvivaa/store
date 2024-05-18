import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    if (!params.brandId) {
      return new NextResponse('Необходим ID Бренда', { status: 400 })
    }

    const brand = await prismadb.brand.findUnique({
      where: {
        id: params.brandId,
      },
    })

    return NextResponse.json(brand)
  } catch (error) {
    console.log('[BRAND_GET]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; brandId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, value } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Необходимо наименование', { status: 400 })
    }

    if (!value) {
      return new NextResponse('Необходимо свойство', { status: 400 })
    }

    if (!params.brandId) {
      return new NextResponse('Необходим ID Бренда', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unathorized', { status: 403 })
    }

    const brand = await prismadb.brand.updateMany({
      where: {
        id: params.brandId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(brand)
  } catch (error) {
    console.log('[BRAND_PATCH]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; brandId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.brandId) {
      return new NextResponse('Необходим ID Бренда', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unathorized', { status: 403 })
    }

    const brand = await prismadb.brand.deleteMany({
      where: {
        id: params.brandId,
      },
    })

    return NextResponse.json(brand)
  } catch (error) {
    console.log('[BRAND_DELETE]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}
