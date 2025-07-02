interface TableData {
  headers: string[]
  rows: string[][]
}

export const Table = ({ data }: { data: TableData }) => (
  <table>
    <thead>
      <tr>
        {data.headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.rows.map((row, index) => (
        <tr key={index}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
