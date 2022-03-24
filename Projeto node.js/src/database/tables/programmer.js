const sequelize = require('sequelize');
const database = require('../db');
const programmer = database.define('programmer', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  python: {
    type: sequelize.BOOLEAN,
    allowNull: false
  },
  javascript: {
    type: sequelize.BOOLEAN,
    allowNull: false
  },
  java: {
    type: sequelize.BOOLEAN,
    allowNull: false
  }
});
module.exports = programmer;

app.put('/updateProgrammer', async (req, res) => {
    try {
        const params = req.body;
        if (!('id' in params)) {
            res.send(`Missing 'id' in request body`);
            return;
        }
        const record = await programmer.findByPk(params.id);

        if (!record) {
            res.send(`Programmer ID not found.`);
            return;
        }

        const properties = ['name', 'python', 'java', 'javascript'];

        const check = properties.some((property) => {
            return property in params;
        });

        if (!check) {
            const propStr = properties.join(', ');
            res.send(`Request body doesn't have any of the following properties: ${propStr}`);
            return;
        }

        /* corrigir */
        record.name = params.name || record.name;
        record.java = 'python' in params ? params.python : python
        record.java = 'java' in params ? params.java : java
        record.java = 'javascript' in params ? params.javascript : javascript
        
        
        await record.save();
        res.send(`${record.id} ${record.name} - Updated successfully`);

    } catch (error) {
        res.send(error);
    }
});


app.delete('/deleteProgrammer', async (req, res) => {
    try {
        const params = req.body;
        if (!('id' in params)) {
            res.send(`Missing 'id' in request body`);
            return;
        }
        
        const record = await programmer.findByPk(params.id);
        
        if (!record) {
            res.send(`Programmer ID not found.`);
            return;
        }
        await record.destroy();
        res.send(`${record.id} ${record.name} - Deleted successfully`);
    } catch (error) {
        res.send(error);
    }
});