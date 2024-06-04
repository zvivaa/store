import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { squareId: string } }
) {
  try {
    if (!params.squareId) {
      return new NextResponse('Необходим ID Бренда', { status: 400 })
    }

    const square = await prismadb.square.findUnique({
      where: {
        id: params.squareId,
      },
    })

    return NextResponse.json(square)
  } catch (error) {
    console.log('[SQUARE_GET]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; squareId: string } }
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

    if (!params.squareId) {
      return new NextResponse('Необходим ID объекта', { status: 400 })
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

    const square = await prismadb.square.updateMany({
      where: {
        id: params.squareId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(square)
  } catch (error) {
    console.log('[SQUARE_PATCH]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; squareId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.squareId) {
      return new NextResponse('Необходим ID объекта', { status: 400 })
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

    const square = await prismadb.square.deleteMany({
      where: {
        id: params.squareId,
      },
    })

    return NextResponse.json(square)
  } catch (error) {
    console.log('[SQUARE_DELETE]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}
