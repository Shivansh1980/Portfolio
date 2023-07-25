from projects.models import Skill
import json
import numpy as np
import pandas as pd
from PIL import Image
import tensorflow as tf
from nltk.corpus import stopwords, wordnet
import pickle, re, nltk
from sklearn.preprocessing import MinMaxScaler
import io, base64, math
from django.core.files.uploadedfile import InMemoryUploadedFile


class BasicProcssing:
    def __init__(self):
        pass

class SkillDataProcessing(BasicProcssing):
    def __init__(self):
        super().__init__()

    def get_skills_by_ids(self, data):
        if(isinstance(data, list)):
            return Skill.objects.filter(id__in=data)
        else:
            return None
        
            
    def get_skills_by_ids_and_names(self, data):
        skills = []
        data = json.loads(data)
        for id_or_name in data:
            try:
                skill_id = int(id_or_name)
                skill = Skill.objects.get(id=skill_id)
                skills.append(skill)
            except Exception as e:
                try:
                    skill_name = id_or_name
                    skill = Skill.objects.get(name__iexact=skill_name)
                    skills.append(skill)
                except Exception as e:
                    return None
        return skills

class ImageProcessor:
    def __init__(self):
        pass

    def array_to_base64(self, np_array, img_shape=(28,28)):
        image = Image.fromarray(np_array)
        image = image.resize(img_shape, Image.BICUBIC)
        return self.image_to_base64(image)

    def shift_image_data(self, image_array):
        shift_value = image_array[np.argmin(image_array)]
        image_array += (-shift_value)
        image_array *= 255
        return image_array

    def base64_string_to_PIL(self, image_str):
        image_ext, image = image_str.split(';base64,')
        image = base64.b64decode(image)
        stream = io.BytesIO(image)
        image = Image.open(stream)
        return image, image_ext
    
    def inmemoryfile_to_PIL(self, inmemoryfile):
        content = inmemoryfile.read()
        stream = io.BytesIO(content)
        return Image.open(stream)
    
    def image_to_base64(self, image):
        image = image.convert('RGB')
        image_buffer = io.BytesIO()
        image.save(image_buffer, format='PNG')
        return b'data:image/png;base64,' + base64.b64encode(image_buffer.getvalue())

class TextTransformer:
    def __init__(self, tokenizer=None, wordnet_lemmatizer=None, input_length=None):
        self.tokenizer = tokenizer
        self.wordnet_lemmatizer = wordnet_lemmatizer
        self.input_length = input_length
    
    def fit(self, X, y=None):
        return self
    
    def get_wordnet_pos(self, treebank_tag):
        tag_dict = {"J": wordnet.ADJ,
                  "N": wordnet.NOUN,
                  "V": wordnet.VERB,
                  "R": wordnet.ADV}
        tag_letter = treebank_tag[0].upper()
        return tag_dict.get(tag_letter, None)
    
    def transform(self, text):
        text = re.sub('[^a-zA-Z\s]', '', text)
        text = re.sub('\s+', ' ', text)
        text = text.replace('\n', '')
        text = text.lower()
        
        stop_words = set(nltk.corpus.stopwords.words('english'))
        words = nltk.word_tokenize(text)
        words = [w for w in words if w.lower() not in stop_words]
        if(self.wordnet_lemmatizer is not None):
            tags = nltk.pos_tag(words)
            lemmas = []
            for w,t in tags:
                wordnet_tag = self.get_wordnet_pos(t)
                if wordnet_tag is not None:
                    lemmas.append(
                        self.wordnet_lemmatizer.lemmatize(w.lower(), pos=wordnet_tag)
                    )
                else:
                    lemmas.append(w.lower())

            text = ' '.join(lemmas)
        else:
            text = ' '.join(words)
            
        sequences = self.tokenizer.texts_to_sequences([text])
        sequences = tf.keras.preprocessing.sequence.pad_sequences(sequences, maxlen=self.input_length)
        return sequences
    
    def inverse_transform(self, sequence):
        idx = np.argmax(sequence)
        return {'type':'text', 'count':1, 'prediction':self.tokenizer.index_word[idx]}
    
    def __getstate__(self):
        # save the tokenizer object as a bytes object
        state = self.__dict__.copy()
        state["tokenizer"] = pickle.dumps(self.tokenizer)
        state["input_length"] = pickle.dumps(self.input_length)
        state["wordnet_lemmatizer"] = pickle.dumps(self.wordnet_lemmatizer)
        return state
    
    def __setstate__(self, state):
        # load the tokenizer object from the bytes object
        self.__dict__.update(state)
        self.tokenizer = pickle.loads(state["tokenizer"])
        self.input_length = pickle.loads(state["input_length"])
        self.wordnet_lemmatizer = pickle.loads(state["wordnet_lemmatizer"])

class ImageTransformer:
    def __init__(self, input_image_size=(28,28), output_image_size=(784,1), img_min_max_scaler=None):
        self.input_image_size = input_image_size
        self.output_image_size = output_image_size
        self.data = None
        if(img_min_max_scaler):
            self.img_min_max_scaler = img_min_max_scaler
        else:
            self.img_min_max_scaler = MinMaxScaler()
            
    def transform(self, image):
        image_processor = ImageProcessor()
        if(isinstance(image, str)):
            image, image_ext = image_processor.base64_string_to_PIL(image)

        if(isinstance(image, InMemoryUploadedFile)):
            image = image_processor.inmemoryfile_to_PIL(image)

        self.data = {'original_image_src':image_processor.image_to_base64(image.resize((100,100),Image.BICUBIC))}
        
        grey_scaled_image = image.convert('L')
        if(grey_scaled_image.size != self.input_image_size):
            grey_scaled_image = grey_scaled_image.resize(self.input_image_size, Image.LANCZOS)
        
        image_array = np.asarray(grey_scaled_image)
        image_array = image_array.reshape(self.input_image_size[0] * self.input_image_size[1], 1)
        image_array = self.img_min_max_scaler.fit_transform(image_array)
        image_array = image_array.reshape(self.output_image_size)
        
        return image_array
    
    def inverse_transform(self, image_array):
        image_processor = ImageProcessor()
        image_array = image_array.reshape(self.input_image_size[0]*self.input_image_size[1], 1)
        shift_value = image_array[np.argmin(image_array)]
        image_array += -(shift_value)
        image_array *= 255
        image = Image.fromarray(image_array.reshape(self.input_image_size)).convert('RGB')
        image = image.resize((100,100), Image.BICUBIC)
        image_src = image_processor.image_to_base64(image)
        return {'type':'IMAGE','image_count':1, 'output_image_src': image_src, 'original_image_src':self.data.get('original_image_src')}
         
    
    def __getstate__(self):
        # save the tokenizer object as a bytes object
        state = self.__dict__.copy()
        state["input_image_size"] = pickle.dumps(self.input_image_size)
        state["output_image_size"] = pickle.dumps(self.output_image_size)
        state["img_min_max_scaler"] = pickle.dumps(self.img_min_max_scaler)
        return state
    
    def __setstate__(self, state):
        # load the tokenizer object from the bytes object
        self.__dict__.update(state)
        self.input_image_size = pickle.loads(state["input_image_size"])
        self.output_image_size = pickle.loads(state["output_image_size"])
        self.img_min_max_scaler = pickle.loads(state["img_min_max_scaler"])


    
class AIModelDataProcessor(BasicProcssing):
    def __init__(self, database_model=None):
        self.database_model = database_model
        self.image_transformer = ImageTransformer()
        self.text_transformer = TextTransformer()
        self.data = {'transformer':None, 'transformed_data':None, 'actual_data':None}

    def is_valid_input(self, fields):
        return True
    
    def transform_data(self, data, transformer_path=None):
        if(not transformer_path and not self.database_model):
            raise Exception("transformer path is required in transfrom data")
        elif(not transformer_path and self.database_model):
            transformer_path = self.database_model.data_transformer.path

        if(self.is_valid_input(data)):
            with open(transformer_path, 'rb') as f:
                state = pickle.load(f)

                if(state['for'] == 'ImageTransformer'):
                    self.image_transformer.__setstate__(state)
                    image = data.get('image')
                    image_array = self.image_transformer.transform(image)
                    self.data = {'transformer':self.image_transformer,'transformed_data':np.array([image_array]), 'original_data':image}
                    return self.data['transformed_data']

                elif(state['for'] == 'TextTransformer'):
                    self.text_transformer.__setstate__(state)
                    new_data = self.text_transformer.transform(data)
                    self.data = {'transformer':self.text_transformer, 'transformed_data':new_data, 'original_data': data}
                    return self.data['transformed_data']

    def inverse_transform_output(self, output):
        return self.data['transformer'].inverse_transform(output)
    

    
    

            
                

    