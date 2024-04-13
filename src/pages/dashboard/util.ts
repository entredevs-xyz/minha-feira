

export const getRandomPhrase = () => {

    const phrases = [
        'Quando eu era garoto não precisava de roupa especial, ter roupa já era especial.',
        'Quer saber o que é mágica? Eu tenho dois empregos, trabalho sete dias por semana e todo dia meu dinheiro desaparece.',
        'Desliga esse relógio da tomada, garoto, você não vê as horas enquanto dorme. São 2 centavos por hora!',
        'Uma coisa que aprendi em relação às mulheres é que mesmo quando você tá certo, você tá errado.',
        'Como assim largou o emprego? Largar é para bebida e cigarro!',
        'Por que eu vou sair pra relaxar se eu posso relaxar em casa que é grátis?',
        'São 49 centavos de leite derramado em toda a mesa. Alguém vai ter que beber esse leite!',
        'Aceita vale-refeição?',
        'Eu não preciso disso, meu marido tem dois empregos!',
        'Eu não sou um homem de muitos amigos, mas os que eu tenho são de verdade. Eles me devem dinheiro!',
        'Se não comprar o desconto é maior!',
    ]

    return phrases[Math.floor(Math.random() * phrases.length)]

}

