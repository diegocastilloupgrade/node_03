const mongoose = require('mongoose');
const Journalist = require('../api/models/journalist.model.js');
const journalist = [
    {
        name: 'Matias Prats',
        age:'66',
        picture: 'https://images.ecestaticos.com/CiTdKBGkJOUQ2N0cB8brUY2orCI=/96x12:823x557/1200x899/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fc39%2F164%2Ffb5%2Fc39164fb5f0e6e6c41acd6d176f7ba03.jpg',
        bio:'Biografía de Matiaaaaaaaasssss'
    },
    {
        name: 'Roberto Brasero',
        age:'34',
        picture: 'https://cope-cdnmed.agilecontent.com/resources/jpg/8/5/1645698117258.jpg',
        bio:'Biografía de Matiaaaaaaaasssss'
    }
]

const journalistDocuments = journalist.map((journalist) => Brand(journalist));

mongoose.connect(
    'mongodb+srv://diegocastillo:xvIYFJFTAvBNrbGv@cluster0.g4eqa.mongodb.net/newspaper?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    const allJournalist = await Journalist.find();
    if (allJournalist.length) {
      await Journalist.collection.drop();
      console.log('Journalist DB deleted');
    }
  })
  .catch((error) => console.log('Error deleting journalist', error))
  .then(async () => {
    await Journalist.insertMany(journalistDocuments);
    console.log('Journalist DB created');
  })
  .catch((error) => console.log('Error creating journalist', error))
  .finally(() => mongoose.disconnect());