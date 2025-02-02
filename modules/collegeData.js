const fs = require('fs');
const path = require('path');

class Data {
  constructor(students, courses) {
      this.students = students;
      this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    
      fs.readFile('./data/students.json', 'utf8', (err, dataFromStudentsFile) => {
          if (err) {
              console.error('Error reading students.json:', err);
              reject("unable to read students.json");
              return;
          }
          let students = JSON.parse(dataFromStudentsFile);

          fs.readFile('./data/courses.json', 'utf8', (err, dataFromCoursesFile) => {
              if (err) {
                  console.error('Error reading courses.json:', err);
                  reject("unable to read courses.json");
                  return;
              }
              let courses = JSON.parse(dataFromCoursesFile);

              dataCollection = new Data(students, courses);
              resolve(dataCollection); 
          });
      });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
      if (dataCollection.students.length > 0) {
          resolve(dataCollection.students);
      } else {
          reject("no results returned");
      }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
      const TAs = dataCollection.students.filter(student => student.TA === true);
      if (TAs.length > 0) {
          resolve(TAs);
      } else {
          reject("no results returned");
      }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
      if (dataCollection.courses.length > 0) {
          resolve(dataCollection.courses);
      } else {
          reject("no results returned");
      }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
};
