const findUniqueNumberInArray = (matriz: number[]): number | number[] => {
  if (matriz.length % 2 === 0) {
    // Restrição se o tamanho da matriz é impar
    throw new Error("Matriz length must be odd");
  }

  if (matriz.length >= 100) {
    // Restrição de tamanho da matriz
    throw new Error("Matriz too large");
  }

  if (matriz.some((num) => num > 100)) {
    // Restrição de tamanho dos números da matriz
    throw new Error("Matriz has at least a very large number");
  }

  const uniqueNumbers = matriz.filter(
    (num) => matriz.indexOf(num) === matriz.lastIndexOf(num)
  );

  if (uniqueNumbers.length > 1) {
    // Restrição de ter apenas um número diferente
    throw new Error("Matriz needs to have only one different number");
  }

  return uniqueNumbers[0];
};

export default findUniqueNumberInArray;

// console.log("Matriz 1: ", findUniqueNumberInArray([1, 1, 2, 3, 2]));
// console.log("Matriz 2: ", findUniqueNumberInArray([1, 1, 3, 3, 2]));
