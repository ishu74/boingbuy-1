import React from 'react'
import { Col, Row } from 'react-bootstrap'
 
function CardShimmerLoader({columnCount, rowCount}) {
  const columns = Array.from({ length: columnCount }, (_, index) => index);
 
  return (
//     <Row className='justify-content-around'>
//     {/* Map through the array to generate dynamic number of columns */}
//     {columns.map((colIndex) => (
//       <Col md={4} key={colIndex}>
//         <p className="card-text placeholder-glow">
//         {Array.from({ length: 2 }, (_, index) => (
//             <span key={index} className="placeholder col-4"></span>
//         ))}
//         </p>
//       </Col>
//     ))}
//   </Row>

<Row className="justify-content-around">
  {columns.map((colIndex) => (
    <Col md={4} key={colIndex}>
      <p className="card-text placeholder-glow">
        {Array.from({ length: 2 }, (_, index) => (
          <span key={index} className="placeholder"></span>
        ))}
      </p>
    </Col>
  ))}
</Row>

  );
}
 
export default CardShimmerLoader