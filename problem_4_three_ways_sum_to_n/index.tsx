const sum_to_n_a = (n: number): number => {
    return n > 0 ? n + sum_to_n_a(n - 1) : 0
}

const sum_to_n_b = (n: number): number => {
    let sum = 0
    let i = 0
    while (i < n) {
        sum += i
        i++
    }
    return sum
}

const sum_to_n_c = (n: number): number => {
    return (n / 2) * (1 + n)
}

sum_to_n_a(5)
sum_to_n_b(5)
sum_to_n_c(5)
