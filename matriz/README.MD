# Teste #1

Considere uma matriz de números inteiros em que todos, exceto um número inteiro, ocorrem em pares. Em outras palavras, cada elemento ocorre exatamente duas vezes, exceto por um elemento exclusivo. Encontre o elemento único.
Por exemplo, dada a matriz `arr = [1 ,1 ,2 ,3 ,2]` você retornaria 3, `arr = [1, 1, 3, 3, 2]` você retornaria 2

## Restrições:

1 < n < 100

É garantido que este é um número ímpar.
0 < arr[i] < 100 onde 0 < i < n

</br>

# Utilização

Você pode importar o arquivo e simplesmente chamalo como função

```js
import findUniqueNumberInArray from "./index.ts";

console.log("Matriz 1: ", findUniqueNumberInArray([1, 1, 2, 3, 2])); // Log 3
console.log("Matriz 2: ", findUniqueNumberInArray([1, 1, 3, 3, 2])); // Log 2
```
