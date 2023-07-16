const { getMessage, addMessage } = require('../controllers/messagesController');

const router = require('express').Router();

router.post('/addmsg', addMessage);
router.post('/getmsg', getMessage);

module.exports = router;
