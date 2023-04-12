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

// Khởi tạo đối tượng PolynomialRegression
const polynomialRegression = new PolynomialRegression();

// Khớp đa thức bậc hai với dữ liệu
const degree = 2;
const coefficients = polynomialRegression.fit(xValues, yValues, degree);

// Tính giá trị dự đoán cho một giá trị x mới
const newX = 5;
const predictedY = polynomialRegression.predict(newX, coefficients);

console.log(predictedY); // 6

```

## API
**fit(xValues: number[], yValues: number[], degree: number): number[]**
Phương thức **fit** được sử dụng để khớp một đa thức bậc **degree** với dữ liệu được cung cấp bởi hai mảng **xValues**  và **yValues** . Phương thức này trả về một mảng chứa các hệ số của đa thức khớp.
```js
const xValues = [0, 1, 2, 3, 4];
const yValues = [1, 2, 3, 4, 5];
const degree = 2;

const polynomialRegression = new PolynomialRegression();
const coefficients = polynomialRegression.fit(xValues, yValues, degree);

console.log(coefficients); // [1, 0, 0]

```

**predict(xValue: number, coefficients: number[]): number**
Phương thức **predict** được sử dụng để tính giá trị dự đoán cho một giá trị **xValue** mới, sử dụng các hệ số của đa thức đã được tính toán trước đó. Phương thức này trả về giá trị dự đoán cho **xValue**.
```js
const xValues = [0, 1, 2, 3, 4];
const yValues = [0, 2, 4, 6, 8];

// Tính đa thức bậc 1
const degree = 1;
const coefficients = polynomialRegression(xValues, yValues, degree);

// Dự đoán giá trị y cho xValue = 5
const xValue = 5;
const predictedY = predict(xValue, coefficients);

console.log(predictedY); // Kết quả: 10

```

## Stay in touch
Facebook - [Khanh Nguyen](https://www.facebook.com/KWalkerNNK)