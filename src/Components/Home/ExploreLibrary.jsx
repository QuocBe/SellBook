import React from 'react';
import '../../assets/style/Home/ExploreLibrary.scss'; // Thêm CSS vào file này nếu bạn chưa có
import kidsIcon from '../../assets/images/kids.png';
import learnIcon from '../../assets/images/learn.png';
import ufoIcon from '../../assets/images/ufo.png';
import thrillerIcon from '../../assets/images/thriller.png';
import heartsIcon from '../../assets/images/hearts.png';
import comicIcon from '../../assets/images/header-background.png';

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
    <div>
      
      {/* Thêm phần Book Types vào đây */}
      <div className="book-types">
        <h2>Book Types</h2>
        <div className="types-container">
          {types.map((type, index) => (
            <div key={index} className="type-item">
              <div className="icon-container">
                
              </div>
              <p>{type.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Các phần khác của component ExploreLibrary */}
    </div>
  );
}

export default ExploreLibrary;
