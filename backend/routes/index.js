var express = require('express');
var router = express.Router();
var cors = require('cors');
const Crudcontroller = require('../controller/crudcon');

router.use(cors());

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello World!')
})


// Save details in database
router.post('/saveInfo', function (req, res, next) {
  const data = { ...req.body };
  // console.log(data);
  Crudcontroller.insertStudent(data).then(result => {
    // console.log(result);
    if (result.rowsAffected > 0) {
      // console.log(data);
      res.json({
        data: result.rowsAffected,
        status: '200',
        msg: 'Data inserted successfully'
      });
    } else {
      res.json({
        data: null,
        status: '201',
        msg: 'Data is empty'
      });
    }
  })
});

// Get all info from database
router.get('/getData', function (req, res, next) {
  Crudcontroller.getInfoData().then(result => {
    if (result.recordsets[0].length > 0) {
      res.json({
        data: result.recordsets[0],
        status: '200',
        msg: 'Data retrieved Successfully'
      });
    } else {
      res.json({
        data: null,
        status: '201',
        msg: 'Data is empty'
      });
    }
    // res.json({
    //   'statuscode': 200,
    //   'statusmessage': "Success"
    // });
  })
});

// Get a Perticular Information of a specific user by id
router.get('/getUser/:id', async function (req, res, next) {
  try {
      const ID =  parseInt(req.params.id);
      const result = await Crudcontroller.getUserById(ID);
      if (result.recordsets[0].length > 0) {
          res.json({
              data: result.recordsets[0][0], // Return the first (and only) record
              status: '200',
              msg: 'User data retrieved successfully'
          });
      } else {
          res.json({
              data: null,
              status: '404',
              msg: 'User not found'
          });
      }
  } catch (error) {
      res.status(500).json({
          data: null,
          status: '500',
          msg: 'Internal Server Error'
      });
  }
});

//update Student Details
router.patch('/updateStudent/:id', async function (req, res, next) {
  const ID = parseInt(req.params.id);  // Ensure ID is an integer
  const updatedData = { ...req.body, ID };  // Merge ID into the data object

  try {
      let result = await Crudcontroller.updateStudent(updatedData);  // Call updateStudent function
      if (result.rowsAffected && result.rowsAffected[0] > 0) {
          res.json({
              data: updatedData,  // Return the updated data
              status: '200',
              msg: 'Data updated successfully'
          });
      } else {
          res.json({
              data: null,
              status: '201',
              msg: 'Data is empty or ID not found'
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({
          data: null,
          status: '500',
          msg: 'An error occurred while updating data'
      });
  }
});

//Delete Student from ID
router.delete('/deleteStudent/:id', function (req, res, next) {
  // const { id } = req.params;
  const ID = parseInt(req.params.id);
  console.log(ID);
  Crudcontroller.DeleteStudentbyId(ID).then(result => {
     console.log(result);
    if (result.rowsAffected[0] > 0) {
      res.json({
        data: result.recordsets,
        status: '200',
        msg: 'Data deleted Successfully'
      });
    } else {
      res.json({
        data: null,
        status: '201',
        msg: 'Data is empty'
      });
    }
  })
});







module.exports = router;
