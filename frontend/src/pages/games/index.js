// import React from "react";
// import "./style.css";
// import HomeIcon from '@mui/icons-material/Home';


// const GameCard = () => {
//     return (
//       <div className="game-card">
//         <div
//           className="game-card-image"
//           style={{ backgroundImage: "url('game-image.jpg')" }}
//         />
//         <div className="relative">
//           <h2 className="game-card-title">Game Title</h2>
//           <p className="game-card-description">Game Description</p>
//         </div>
//       </div>
//     );
//   };

// const Games = () => {
//   return (
//     <div>
        
//     <h2> <br /> &nbsp;&nbsp; GAMES <HomeIcon className="ic" /> </h2>
//     <br />
    
    

//     <div className="card-container">
        
//       {[...Array(30)].map((_, index) => (
//         <GameCard key={index} />
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Games;


// // import GameCard from "./GameCard";

// // const App = () => {
// //   const [selectedGame, setSelectedGame] = useState(null);

// //   const handleGameClick = (game) => {
// //     setSelectedGame(game);
// //   };

// //   return (
// //     <div className="flex flex-wrap justify-center gap-4">
// //       {[...Array(10)].map((_, index) => (
// //         <GameCard
// //           key={index}
// //           onClick={() => handleGameClick(index)}
// //           isSelected={selectedGame === index}
// //         />
// //       ))}
// //     </div>
// //   );
// // };
import React from 'react';
import './style.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import Header from "../../components/header";
import game1 from "./tictoktoe/index";



const games = [
  {
    id: 1,
    name: 'TicTokToe',
    backgroundImage: 'game1.jpg',
    
  },
  {
    id: 2,
    name: 'Game 2',
    backgroundImage: 'game2.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 4',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 5',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
    
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },
  {
    id: 3,
    name: 'Game 3',
    backgroundImage: 'game3.jpg',
  },


  // Add more game objects as needed
];

function Games() {
  return (
    <div className="App">
      
         <Header page = "games" />
        
      <div className="game-cards">
        {games.map((game) => (
          <div key={game.id} className="game-card" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${game.backgroundImage})` }}>
            <h2>{game.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
