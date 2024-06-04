import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import prismadb from '@/lib/prismadb'

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string
    }
  }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const {
      name,
      price,
      categoryId,
      brandId,
      specId,
      squareId,
      power,
      wifi,
      maxTemp,
      minTemp,
      noise,
      images,
      isFeatured,
      isArchived,
    } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
    }

    if (!brandId) {
      return new NextResponse('Brand ID is required', { status: 400 })
    }

    if (!specId) {
      return new NextResponse('Specials ID is required', { status: 400 })
    }

    if (!squareId) {
      return new NextResponse('Square is required', { status: 400 })
    }

    if (!power) {
      return new NextResponse('Power is required', { status: 400 })
    }

    if (!wifi) {
      return new NextResponse('Wifi is required', { status: 400 })
    }

    if (!maxTemp) {
      return new NextResponse('Max Temp is required', { status: 400 })
    }

    if (!minTemp) {
      return new NextResponse('Min Temp is required', { status: 400 })
    }

    if (!noise) {
      return new NextResponse('Noise is required', { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        brandId,
        specId,
        squareId,
        power,
        wifi,
        maxTemp,
        minTemp,
        noise,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse('Interal error', { status: 500 })
  }
}
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string
    }
  }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined
    const brandId = searchParams.get('brandId') || undefined
    const specId = searchParams.get('specId') || undefined
    const isFeatured = searchParams.get('isFeatured')

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        brandId,
        specId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        brand: true,
        spec: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return new NextResponse('Interal error', { status: 500 })
  }
}
