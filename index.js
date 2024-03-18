const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'filePath',
      message: 'What is name of the file that you want to decode?',
    }
  ])
  .then((res) => {
    decode(res.filePath); // decode the message contained in the file path
  })
  
  const decode = (message_file) => {
    // read the contents of the file and decode the message
    fs.readFile(`data/${message_file}`, 'utf8', (err, data) => {
      const dataArr = data.split('\r\n'); //creat an array of the data
      console.log(`The decoded message is: "${makePyramid(dataArr)}"`); //log the decoded message
    });
  }

  const makePyramid = (dataArr) => {
    // parse data into an array of objects
    const objArr = [];
    for (let i = 0; i < dataArr.length; i++) {
      const obj = {
        num: dataArr[i].split(' ')[0],
        word: dataArr[i].split(' ')[1],
      }
      objArr.push(obj);
    }

    // sort objects by num
    objArr.sort((a, b) => {
      return a.num - b.num;
    });

    // arrange objects into pyramid structure
    const pyramid = [];
    let level = 0; // level 0 is the top of the pyramid
    let levelArr = []; // array to hold objects for each level
    for (let i = 0; i < objArr.length; i++) {
      levelArr.push(objArr[i]);
      if (levelArr.length === level + 1) {
        pyramid.push(levelArr);
        levelArr = []; //empty level array
        level++; //increment level
      }
    }

    // return a string of the last word of each level
    let decodedMessage = '';
    for (let i = 0; i < pyramid.length; i++) {
      decodedMessage += `${pyramid[i][pyramid[i].length - 1].word} `;
    }

    return decodedMessage.trim();
  }
