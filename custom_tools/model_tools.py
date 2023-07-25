import tensorflow as tf
import numpy as np
from custom_tools.data_processing_tools import AIModelDataProcessor, ImageProcessor

def generate_text(model, seed_text, number_of_next_words, data_processor):
    for _ in range(number_of_next_words):
        token_list = data_processor.transform_data(seed_text)
        predicted = np.argmax(model.predict(token_list, verbose=0))
        output_word = data_processor.data['transformer'].tokenizer.index_word[predicted]
        seed_text += " "+output_word
    return seed_text.title()

class ModelOutputPredictor:
    def __init__(self, database_model):
        self.database_model = database_model
        self.model = tf.keras.models.load_model(database_model.data.path)
        self.data_processor = AIModelDataProcessor(database_model=self.database_model)


    def predict(self, input_data):
        if(self.database_model.name == 'LSTM_TEXT_GENERATOR'):
            seed_text = input_data.get('seed_text')
            number_of_words = int(input_data.get('word_count'))
            text = generate_text(self.model, seed_text, number_of_words, self.data_processor)
            return {'type':'text', 'count':1, 'prediction':text}
        
        if(self.database_model.name == 'IMAGE_ENCODER_AND_DECODER'):
            image_processor = ImageProcessor()
            data = self.data_processor.transform_data(input_data)
            prediction = self.model.predict(data)
            encoder = self.model.get_layer('sequential_4')
            encoded_image = np.array(encoder(data)[0])
            encoded_image = np.array(tf.keras.activations.relu(encoded_image))
            encoded_image = image_processor.shift_image_data(encoded_image)
            encoded_image = encoded_image.reshape(15,15)
            encoded_image = image_processor.array_to_base64(encoded_image, img_shape=(50,50))
            data = self.data_processor.inverse_transform_output(prediction)
            data['encoded_image_src'] = encoded_image
            return data



