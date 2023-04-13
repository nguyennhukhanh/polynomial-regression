# Polynomial Regression
**PolynomialRegression** là một class trong JavaScript để thực hiện việc khớp một phương trình đa thức với một tập hợp các điểm dữ liệu sử dụng phương pháp hồi quy đa thức. Class này cung cấp một số phương thức cho việc tính toán và xử lý ma trận, bao gồm:

**transpose(matrix: number[][]): number[][]**: Tính chuyển vị của một ma trận.

**multiplyMatrices(a: number[][], b: number[][]): number[][]**: Nhân hai ma trận lại với nhau.

**invertMatrix(matrix: number[][]): number[][]**: Tính nghịch đảo của một ma trận vuông sử dụng phép loại Gauss.

## Usage
Bạn có thể sử dụng class **PolynomialRegression** bằng cách import hoặc require nó vào trong dự án của mình, sau đó khởi tạo một đối tượng và gọi các phương thức để thực hiện việc khớp đa thức với dữ liệu.
```js
import { PolynomialRegression } from './PolynomialRegression';

const xValues = [0, 1, 2, 3, 4];
const yValues = [1, 2, 3, 4, 5];

const polynomialRegression = new PolynomialRegression();

const degree = 2;

const coefficients = polynomialRegression.fit(xValues, yValues, degree);

console.log(coefficients);

```

## Logger
```ts
(async () => {
  const xValues = [1, 2, 3];
  const yValues = [1, 4, 9];
  const order = 2;
  const coefficients = await PolynomialRegression.polynomialRegression(
    xValues,
    yValues,
    order
  );

  // Kết quả của hồi quy đa thức = [0, 0, 1] với y = 1 * x^2.
  console.log("Kết quả của hồi quy đa thức là " + coefficients);
  PolynomialRegression.testing(coefficients);

  console.log(
    "Giá trị x tương ứng với giá trị y bằng 16 là " +
      PolynomialRegression.findX(
        coefficients,
        16,
        1,
        PolynomialRegression.tolerance,
        1000
      )
  ); // 4

  console.log(
    "Giá trị y tương ứng với giá trị x bằng 4 là " +
      PolynomialRegression.findY(coefficients, 4)
  ); // 16
})();

```

## Stay in touch
Facebook - [Khanh Nguyen](https://www.facebook.com/KWalkerNNK)