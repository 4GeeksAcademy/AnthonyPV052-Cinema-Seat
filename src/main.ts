if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "Revisa la consola para ver el estado de la sala de cine.";
    }
  });
}

type SeatMatrix = number[][];

type ContiguousSeatsResult =
  | {
      found: true;
      row: number;
      col1: number;
      col2: number;
    }
  | {
      found: false;
      message: string;
    };

function initializeSeatMatrix(rows = 8, cols = 10): SeatMatrix { // Esta función inicializa la matriz de asientos con 0 (libre) para una sala de cine con un número predeterminado de filas y columnas. Puedes ajustar los valores predeterminados según tus necesidades.
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
}

function displayRoomStatus(seats: SeatMatrix): void { // Esta función muestra el estado actual de la sala de cine en la consola, indicando qué asientos están ocupados (X) y cuáles están libres (L). También muestra los encabezados de fila y columna para facilitar la identificación de los asientos.
  const totalCols = seats[0]?.length ?? 0;
  const colHeader = Array.from({ length: totalCols }, (_, colIndex) =>
    String(colIndex + 1).padStart(2, " "),
  ).join(" ");

  console.log("\nEstado actual de la sala:\n");
  console.log(`     ${colHeader}`);
  console.log(`    ${"---".repeat(totalCols)}`);

  seats.forEach((row, rowIndex) => {
    const rowLabel = `F${String(rowIndex + 1).padStart(2, "0")}`;
    const rowStatus = row.map((seat) => (seat === 1 ? " X" : " L")).join(" ");
    console.log(`${rowLabel} |${rowStatus}`);
  });
}

function reserveSeat(seats: SeatMatrix, row: number, col: number): string { // Esta función intenta reservar un asiento específico en la sala de cine. Devuelve un mensaje indicando si la reserva fue exitosa o si el asiento ya está ocupado o fuera de rango.
  const rowIndex = row - 1;
  const colIndex = col - 1;
  const totalRows = seats.length;
  const totalCols = seats[0]?.length ?? 0;

  if (rowIndex < 0 || rowIndex >= totalRows || colIndex < 0 || colIndex >= totalCols) {
    return `Error: la posicion (fila ${row}, columna ${col}) esta fuera de rango.`;
  }

  if (seats[rowIndex][colIndex] === 1) {
    return `No disponible: el asiento (fila ${row}, columna ${col}) ya esta ocupado.`;
  }

  seats[rowIndex][colIndex] = 1;
  return `Reserva exitosa: asiento (fila ${row}, columna ${col}) reservado.`;
}

function countSeatStatus(seats: SeatMatrix): { // Esta función cuenta el número de asientos ocupados, disponibles y el total de asientos en la sala de cine. Devuelve un objeto con esta información.
  occupied: number;
  available: number;
  total: number;
} {
  const occupied = seats.reduce(
    (accRows, row) => accRows + row.reduce((accCols, seat) => accCols + seat, 0),
    0,
  );
  const total = seats.length * (seats[0]?.length ?? 0);
  return {
    occupied,
    available: total - occupied,
    total,
  };
}

function findFirstContiguousSeats(seats: SeatMatrix): ContiguousSeatsResult { // Esta función busca el primer par de asientos contiguos disponibles en la sala de cine. Devuelve un objeto indicando si se encontraron asientos contiguos y, en caso afirmativo, la fila y las columnas de esos asientos. Si no se encuentran asientos contiguos, devuelve un mensaje indicando que no hay pares disponibles.
  for (let row = 0; row < seats.length; row += 1) {
    for (let col = 0; col < seats[row].length - 1; col += 1) {
      if (seats[row][col] === 0 && seats[row][col + 1] === 0) {
        return {
          found: true,
          row: row + 1,
          col1: col + 1,
          col2: col + 2,
        };
      }
    }
  }

  return {
    found: false,
    message: "No hay pares de asientos contiguos disponibles.",
  };
}


(window as any).reserveSeat = reserveSeat;
(window as any).countSeatStatus = countSeatStatus;
(window as any).findFirstContiguousSeats = findFirstContiguousSeats;
(window as any).displayRoomStatus = displayRoomStatus;
(window as any).initializeSeatMatrix = initializeSeatMatrix;

console.log("Escribe seats = initializeSeatMatrix() en la consola para inicializar la matriz de asientos.");

console.log("Usa la función reserveSeat(seats, <fila>, <columna>) para reservar un asiento.");


console.log("Usa la función displayRoomStatus(seats) para mostrar el estado actual de la sala de cine.");

console.log("Usa la función countSeatStatus(seats) para contar el número de asientos ocupados, disponibles y el total de asientos.");
console.log("Usa la función findFirstContiguousSeats(seats) para encontrar el primer par de asientos contiguos disponibles.");


export {};
