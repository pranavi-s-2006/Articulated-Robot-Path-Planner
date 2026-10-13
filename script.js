function readMatrix(id) {
    const text = document.getElementById(id).value.trim();

    const rows = text.split("\n").map(row =>
        row.trim().split(/\s+/).map(Number)
    );

    if (rows.length !== 4 || rows.some(row => row.length !== 4)) {
        throw new Error("Matrix must be 4 × 4");
    }

    if (rows.some(row => row.some(value => Number.isNaN(value)))) {
        throw new Error("Matrix contains invalid values");
    }

    return rows;
}

function multiply(A, B) {
    const result = Array.from({ length: 4 }, () => Array(4).fill(0));

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}

function calculatePath() {
    try {
        const A = readMatrix("matrixA");
        const B = readMatrix("matrixB");

        const result = multiply(A, B);

        document.getElementById("output").textContent =
            result.map(row => row.map(value => value.toFixed(2)).join("   ")).join("\n");

        const x = result[0][3];
        const y = result[1][3];
        const z = result[2][3];

        document.getElementById("position").textContent =
            `X = ${x.toFixed(2)}, Y = ${y.toFixed(2)}, Z = ${z.toFixed(2)}`;

        document.getElementById("status").textContent =
            "Robot path calculated successfully.";

    } catch (error) {
        document.getElementById("status").textContent =
            "Error: " + error.message;
    }
}