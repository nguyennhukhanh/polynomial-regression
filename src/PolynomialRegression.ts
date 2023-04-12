class PolynomialRegression {
  public static tolerance = 1e-10;

  /**
   * Tính chuyển vị của ma trận
   * @param matrix Ma trận cần chuyển vị
   * @returns Ma trận chuyển vị
   */
  private static transpose(matrix: number[][]): number[][] {
    // Khởi tạo ma trận chuyển vị với kích thước phù hợp
    const transposed: number[][] = [];
    for (let i = 0; i < matrix[0].length; i++) {
      transposed.push([]);
    }

    // Điền giá trị vào ma trận chuyển vị
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        transposed[j][i] = matrix[i][j];
      }
    }

    return transposed;
  }

  /**
   * Nhân hai ma trận lại với nhau
   * @param a Ma trận thứ nhất
   * @param b Ma trận thứ hai
   * @returns Kết quả của việc nhân hai ma trận lại với nhau
   */
  private static multiplyMatrices(a: number[][], b: number[][]): number[][] {
    // Khởi tạo ma trận kết quả với kích thước phù hợp
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result.push([]);
      for (let j = 0; j < b[0].length; j++) {
        result[i].push(0);
      }
    }

    // Tính toán giá trị của ma trận kết quả
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }

    return result;
  }

  /**
   * Tính nghịch đảo của ma trận vuông sử dụng phép loại Gauss
   * @param matrix Ma trận vuông cần tính nghịch đảo
   * @returns Nghịch đảo của ma trận đã cho
   */
  private static invertMatrix(matrix: number[][]): number[][] {
    // Khởi tạo ma trận mở rộng với ma trận đã cho và một ma trận đơn vị cùng kích thước
    const augmented: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
      augmented.push([...matrix[i]]);
      for (let j = 0; j < matrix.length; j++) {
        augmented[i].push(i === j ? 1 : 0);
      }
    }

    // Thực hiện phép loại Gauss trên ma trận mở rộng để chuyển đổi nó thành dạng hàng bậc thang rút gọn
    for (let i = 0; i < augmented.length; i++) {
      // Tìm phần tử chốt và hoán đổi hàng nếu cần thiết
      let pivotRow = i;
      for (let j = i + 1; j < augmented.length; j++) {
        if (Math.abs(augmented[j][i]) > Math.abs(augmented[pivotRow][i])) {
          pivotRow = j;
        }
      }
      [augmented[pivotRow], augmented[i]] = [augmented[i], augmented[pivotRow]];

      // Chia hàng chốt cho phần tử chốt để làm cho nó bằng một
      const pivotElement = augmented[i][i];
      for (let j = i; j < augmented[i].length; j++) {
        augmented[i][j] /= pivotElement;
      }

      // Trừ bội số của hàng chốt từ tất cả các hàng khác để làm cho tất cả các phần tử khác trong cột hiện tại bằng không
      for (let j = 0; j < augmented.length; j++) {
        if (j !== i) {
          const factor = augmented[j][i];
          for (let k = i; k < augmented[j].length; k++) {
            augmented[j][k] -= factor * augmented[i][k];
          }
        }
      }
    }

    // Trích xuất ma trận nghịch đảo từ nửa bên phải của ma trận mở rộng
    const inverse: number[][] = [];
    for (let i = 0; i < augmented.length; i++) {
      inverse.push(augmented[i].slice(augmented.length));
    }

    return inverse;
  }

  /**
   * Khớp một phương trình đa thức với một tập hợp các điểm dữ liệu bằng cách sử dụng hồi quy đa thức
   * @param xValues Các giá trị x của các điểm dữ liệu
   * @param yValues Các giá trị y của các điểm dữ liệu
   * @param order Bậc của đa thức để khớp
   * @returns Một mảng chứa các hệ số của đa thức được khớp theo thứ tự tăng dần của bậc
   */
  public static async polynomialRegression(
    xValues: number[],
    yValues: number[],
    order: number
  ): Promise<number[]> {
    return new Promise((resolve) => {
      // Khởi tạo ma trận thiết kế với kích thước phù hợp
      const designMatrix: number[][] = [];
      for (let i = 0; i < xValues.length; i++) {
        designMatrix.push([]);
        for (let j = 0; j <= order; j++) {
          designMatrix[i].push(Math.pow(xValues[i], j));
        }
      }

      // Tính chuyển vị của ma trận thiết kế
      const designMatrixTransposed =
        PolynomialRegression.transpose(designMatrix);

      // Tính tích của chuyển vị của ma trận thiết kế và ma trận thiết kế
      const designMatrixProduct = PolynomialRegression.multiplyMatrices(
        designMatrixTransposed,
        designMatrix
      );

      // Đảo ngược tích của chuyển vị của ma trận thiết kế và ma trận thiết kế
      const designMatrixProductInverse =
        PolynomialRegression.invertMatrix(designMatrixProduct);

      // Định dạng lại các giá trị y thành một ma trận cột
      const yValuesColumnMatrix: number[][] = [];
      for (let i = 0; i < yValues.length; i++) {
        yValuesColumnMatrix.push([yValues[i]]);
      }

      // Tính tích của chuyển vị của ma trận thiết kế và ma trận cột giá trị y
      const designMatrixYValuesProduct = PolynomialRegression.multiplyMatrices(
        designMatrixTransposed,
        yValuesColumnMatrix
      );

      // Tính các hệ số của đa thức được khớp bằng cách nhân nghịch đảo của tích của chuyển vị của ma trận thiết kế và ma trận thiết kế với tích của chuyển vị của ma trận thiết kế và ma trận cột giá trị y
      const coefficientsColumnMatrix = PolynomialRegression.multiplyMatrices(
        designMatrixProductInverse,
        designMatrixYValuesProduct
      );

      // Định dạng lại ma trận cột hệ số thành một mảng
      const coefficients: number[] = [];
      for (let i = 0; i < coefficientsColumnMatrix.length; i++) {
        coefficients.push(coefficientsColumnMatrix[i][0]);
      }

      resolve(coefficients);
    });
  }
}

// Kiểm tra
(async () => {
  const xValues = [1, 2, 3];
  const yValues = [1, 4, 9];
  const order = 2;
  const coefficients = await PolynomialRegression.polynomialRegression(
    xValues,
    yValues,
    order
  );

  // Kết quả của hồi quy đa thức
  console.log(coefficients);

  // So sánh các hệ số được tính toán với các hệ số mong đợi bằng cách sử dụng giá trị dung sai
  const expectedCoefficients = [0, 0, 1];
  for (let i = 0; i < coefficients.length; i++) {
    if (
      Math.abs(coefficients[i] - expectedCoefficients[i]) <
      PolynomialRegression.tolerance
    ) {
      console.log(`Hệ số ${i} gần đúng với giá trị mong đợi`);
    } else {
      console.log(`Hệ số ${i} không đúng với giá trị mong đợi`);
    }
  }
})();
