import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Limpar dados antigos
  await prisma.reserva.deleteMany()
  await prisma.gift.deleteMany()
  await prisma.user.deleteMany()

  const gifts = [
    { name: "Balança de alimentos", description: "Ideal para medir ingredientes com precisão.", category: "Cozinha" },
    { name: "Porta detergente (preto ou bege)", description: "Suporte prático para detergente e esponja.", category: "Cozinha" },
    { name: "Protetor de panela", description: "Protege superfícies do calor das panelas.", category: "Cozinha" },
    { name: "Escada de 4 degraus (alta)", description: "Escada resistente para alcançar locais altos.", category: "Casa" },
    { name: "Sanduicheira", description: "Aparelho elétrico para preparar sanduíches e lanches rápidos.", category: "Cozinha" },
    { name: "Pratos rasos e fundos", description: "Conjunto de pratos para refeições diárias.", category: "Cozinha" },
    { name: "Ferro de passar", description: "Ferro elétrico para passar roupas.", category: "Lavanderia" },
    { name: "Rodinho de pia e porta pano", description: "Kit prático para limpeza e organização da pia.", category: "Cozinha" },
    { name: "Kit 7 utensílios de cozinha", description: "Espátula, concha, escumadeira, colher, pegador de massa e garfo trinchante.", category: "Cozinha" },
    { name: "2 baldes e prendedores", description: "Itens essenciais para lavanderia e limpeza.", category: "Lavanderia" },
    { name: "Suporte para botijão", description: "Base para sustentação e segurança do botijão de gás.", category: "Cozinha" },
    { name: "Cesto de roupa", description: "Cesto para roupas sujas ou limpas.", category: "Lavanderia" },
    { name: "Lixo para cozinha pequeno", description: "Lixeira pequena para cozinha.", category: "Cozinha" },
    { name: "Lixo para banheiro", description: "Lixeira com tampa ideal para banheiro.", category: "Banheiro" },
    { name: "2 conjuntos de copos", description: "Copos de vidro para o dia a dia.", category: "Cozinha" },
    { name: "Peneira / abridor de lata / escorredor de arroz", description: "Utensílios diversos de cozinha.", category: "Cozinha" },
    { name: "Prato de sobremesa / escorredor de macarrão", description: "Itens para sobremesa e preparo de massas.", category: "Cozinha" },
    { name: "Conjunto de assadeiras", description: "Assadeiras de diferentes tamanhos para forno.", category: "Cozinha" },
    { name: "Escorredor de louça / pá de lixo", description: "Itens para limpeza e organização da cozinha.", category: "Cozinha" },
    { name: "Tábua de carne / escova vaso sanitário", description: "Itens de cozinha e limpeza.", category: "Casa" },
    { name: "3 tapetes para banheiro de pano / saleiro", description: "Kit de tapetes e saleiro.", category: "Banheiro" },
    { name: "Conjunto de sobremesa", description: "Tigelas e colheres para sobremesa.", category: "Cozinha" },
    { name: "Conjunto de xícaras médias", description: "Xícaras ideais para café ou chá.", category: "Cozinha" },
    { name: "Conjunto de canecas", description: "Canecas diversas para bebidas.", category: "Cozinha" },
    { name: "Lixo para cozinha grande", description: "Lixeira grande para cozinha.", category: "Cozinha" },
    { name: "Guardanapos / kit pote (açúcar, arroz…)", description: "Conjunto de potes e guardanapos.", category: "Cozinha" },
    { name: "5 toalhas de rosto", description: "Toalhas pequenas para uso diário.", category: "Banheiro" },
    { name: "2 toalhas de banho", description: "Toalhas de banho macias.", category: "Banheiro" },
    { name: "Kit conjunto de potes", description: "Potes organizadores para mantimentos.", category: "Cozinha" },
    { name: "Varal de chão", description: "Varal retrátil para roupas.", category: "Lavanderia" },
  ]

  // Criar presentes no banco
  for (const gift of gifts) {
    await prisma.gift.create({
      data: {
        name: gift.name,
        description: gift.description,
        category: gift.category,
        available: true,
      },
    })
  }

  console.log(`✅ ${gifts.length} presentes criados com sucesso!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
