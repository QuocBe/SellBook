import React from 'react';
import '../../assets/style/Home/ExploreLibrary.scss'; // Đường dẫn tới file CSS của bạn
import kidsIcon from '../../assets/images/kids.png'; // Icon cho Children
import learnIcon from '../../assets/images/learn.png'; // Icon cho History
import ufoIcon from '../../assets/images/ufo.png'; // Icon cho Fiction
import thrillerIcon from '../../assets/images/thriller.png'; // Icon cho Thriller
import heartsIcon from '../../assets/images/hearts.png'; // Icon cho Romance
import comicIcon from '../../assets/images/chat.png'; // Icon cho Comics

function ExploreLibrary() {
  const types = [
    { icon: kidsIcon, label: 'Children' },
    { icon: learnIcon, label: 'History' },
    { icon: ufoIcon, label: 'Fiction' },
    { icon: thrillerIcon, label: 'Thriller' },
    { icon: heartsIcon, label: 'Romance' },
    { icon: comicIcon, label: 'Comics' },
  ];

  return (
    <div className="explore-library">
      <div className="book-types">
        <h2>Book Types</h2>
        <div className="types-container">
          {types.map((type, index) => (
            <div key={index} className="type-item">
              <div className="icon-container">
                <img src={type.icon} alt={`${type.label} icon`} />
              </div>
              <p>{type.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreLibrary;
