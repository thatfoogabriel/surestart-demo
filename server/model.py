import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

data = pd.read_csv('data.csv')
#data = data.head(40)

inputs = ['Average Water Per Well (bbl)', 'Average TD (ft)', 'Average Lateral Length (ft)', 'Average GL Elevation (ft)']
X = data[inputs]
outputs = ['Average Oil Per Well (bbl)', 'Average Gas Per Well (cf)', 'Average Emissions Per Well (tons)']
y = data[outputs]

scaler_x = StandardScaler()
scaler_y = StandardScaler()

X_scaled = scaler_x.fit_transform(X)
y_scaled = scaler_y.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_scaled, test_size=0.2, random_state=64)

X_train_scaled = tf.convert_to_tensor(X_train, dtype=tf.float32)
y_train_scaled = tf.convert_to_tensor(y_train, dtype=tf.float32)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(X_train_scaled.shape[1],)),
    tf.keras.layers.Dense(512, activation='relu'),
    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(3)
])

model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_absolute_error'])
history = model.fit(X_train_scaled, y_train_scaled, epochs=100, batch_size=32, validation_split=0.1)

training_dict = {}
validation_dict = {}

for epoch, train_loss, val_loss in zip(range(1, len(history.history['loss']) + 1), history.history['loss'], history.history['val_loss']):
    training_dict[epoch] = round(train_loss, 5)
    validation_dict[epoch] = round(val_loss, 5)

X_test_scaled = scaler_x.transform(X_test)
y_test_scaled = scaler_y.transform(y_test)

loss, mae = model.evaluate(X_test_scaled, y_test)
print(f"Mean Squared Error on Test Data: {loss}")
print(f"Mean Absolute Error on Test Data: {mae}")

plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.title('Loss vs. Epochs')
plt.show()

print()
formatted_training_loss = ", ".join([f"{epoch}: {loss}" for epoch, loss in training_dict.items()])
print(f"Training Loss: {{{formatted_training_loss}}}")

print()
formatted_validation_loss = ", ".join([f"{epoch}: {loss}" for epoch, loss in validation_dict.items()])
print(f"Validation Loss: {{{formatted_validation_loss}}}")
