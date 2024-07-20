function randomError(rate: number): boolean {
  const random = Math.random();

  if (random < rate)
    return true
  
  return false
  
}

export { randomError }
