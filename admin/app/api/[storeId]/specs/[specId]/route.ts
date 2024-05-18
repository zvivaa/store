import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { specId: string } }
) {
  try {
    if (!params.specId) {
      return new NextResponse('Необходим ID характеристики', { status: 400 })
    }

    const spec = await prismadb.spec.findUnique({
      where: {
        id: params.specId,
      },
    })

    return NextResponse.json(spec)
  } catch (error) {
    console.log('[SPEC_GET]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; specId: string } }
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

    if (!params.specId) {
      return new NextResponse('Необходим ID характеристики', { status: 400 })
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

    const spec = await prismadb.spec.updateMany({
      where: {
        id: params.specId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(spec)
  } catch (error) {
    console.log('[SPEC_PATH]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; specId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.specId) {
      return new NextResponse('Необходим ID характеристики', { status: 400 })
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

    const spec = await prismadb.spec.deleteMany({
      where: {
        id: params.specId,
      },
    })

    return NextResponse.json(spec)
  } catch (error) {
    console.log('[SPEC_DELETED]', error)
    return new NextResponse('Iternal error', { status: 500 })
  }
}
