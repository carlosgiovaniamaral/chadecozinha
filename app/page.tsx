"use client"

import { useState, useEffect } from "react"
import { GiftCard } from "@/components/gift-card"
import { ReservaModal } from "@/components/reserva-modal"
import { Header } from "@/components/header"
import { CategoryFilter } from "@/components/category-filter"
import { Gift } from "./types/gift"  // ✅ Mantém só isso

export default function Home() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [loading, setLoading] = useState(true)
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadGifts()
  }, [])

  const loadGifts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/gifts")
      const data = await response.json()
      setGifts(data)
      setFilteredGifts(data)
    } catch (error) {
      console.error("Erro ao carregar presentes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === "Todos") {
      setFilteredGifts(gifts)
    } else {
      setFilteredGifts(gifts.filter((gift) => gift.category === category))
    }
  }

  const handleReserve = (gift: Gift) => {
    setSelectedGift(gift)
    setShowModal(true)
  }

  const handleReservaSuccess = () => {
    loadGifts()
    setShowModal(false)
  }

  const categories = ["Todos", ...Array.from(new Set(gifts.map((g) => g.category)))]
  const availableGifts = filteredGifts.filter((g) => g.available).length
  const reservedGifts = gifts.filter((g) => !g.available).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-amber-700">Total de Presentes</div>
            <div className="text-3xl font-bold text-amber-900 mt-2">{gifts.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-amber-700">Disponíveis</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{availableGifts}</div>
          </div>
          <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-amber-700">Reservados</div>
            <div className="text-3xl font-bold text-amber-900 mt-2">{reservedGifts}</div>
          </div>
        </div>

        {/* Filtro de categoria */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-amber-700">Carregando presentes...</div>
          </div>
        )}

        {/* Grid */}
        {!loading && filteredGifts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} onReserve={handleReserve} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredGifts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-amber-700 text-lg">Nenhum presente encontrado</div>
          </div>
        )}
      </main>

      {selectedGift && (
        <ReservaModal
          gift={selectedGift}
          open={showModal}
          onOpenChange={setShowModal}
          onSuccess={handleReservaSuccess}
        />
      )}
    </div>
  )
}
