import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CodePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Starter Code</CardTitle>
          <CardDescription>Example code to help you get started with the competition</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="python">
            <TabsList className="mb-4">
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="r">R</TabsTrigger>
              <TabsTrigger value="julia">Julia</TabsTrigger>
            </TabsList>
            <TabsContent value="python" className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm">
                  <code>{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, models

# Load the data
def load_data(path):
    data = np.load(path)
    return data['x_train'], data['y_train'], data['x_test'], data['y_test']

x_train, y_train, x_test, y_test = load_data('data.npz')

# Normalize pixel values to be between 0 and 1
x_train, x_test = x_train / 255.0, x_test / 255.0

# Build the model
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10))

# Compile the model
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Train the model
history = model.fit(x_train, y_train, epochs=10, 
                    validation_data=(x_test, y_test))

# Evaluate the model
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f'Test accuracy: {test_acc}')`}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="r" className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm">
                  <code>{`library(keras)
library(tidyverse)

# Load the data
load_data <- function(path) {
  data <- np$load(path)
  list(
    x_train = data$x_train,
    y_train = data$y_train,
    x_test = data$x_test,
    y_test = data$y_test
  )
}

data <- load_data('data.npz')
x_train <- data$x_train
y_train <- data$y_train
x_test <- data$x_test
y_test <- data$y_test

# Normalize pixel values to be between 0 and 1
x_train <- x_train / 255
x_test <- x_test / 255

# Build the model
model <- keras_model_sequential() %>%
  layer_conv_2d(filters = 32, kernel_size = c(3, 3), activation = 'relu',
                input_shape = c(32, 32, 3)) %>%
  layer_max_pooling_2d(pool_size = c(2, 2)) %>%
  layer_conv_2d(filters = 64, kernel_size = c(3, 3), activation = 'relu') %>%
  layer_max_pooling_2d(pool_size = c(2, 2)) %>%
  layer_conv_2d(filters = 64, kernel_size = c(3, 3), activation = 'relu') %>%
  layer_flatten() %>%
  layer_dense(units = 64, activation = 'relu') %>%
  layer_dense(units = 10)

# Compile the model
model %>% compile(
  optimizer = 'adam',
  loss = loss_sparse_categorical_crossentropy(from_logits = TRUE),
  metrics = c('accuracy')
)

# Train the model
history <- model %>% fit(
  x_train, y_train,
  epochs = 10,
  validation_data = list(x_test, y_test)
)

# Evaluate the model
results <- model %>% evaluate(x_test, y_test, verbose = 0)
cat('Test accuracy:', results$accuracy)`}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="julia" className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm">
                  <code>{`using Flux
using Flux: onehotbatch, onecold, crossentropy, throttle
using NPZ
using Statistics
using CUDA

# Load the data
function load_data(path)
    data = npzread(path)
    return data["x_train"], data["y_train"], data["x_test"], data["y_test"]
end

x_train, y_train, x_test, y_test = load_data("data.npz")

# Normalize pixel values to be between 0 and 1
x_train = x_train ./ 255.0
x_test = x_test ./ 255.0

# Reshape data for Flux
x_train = permutedims(x_train, (3, 2, 1, 4))
x_test = permutedims(x_test, (3, 2, 1, 4))

# One-hot encode labels
y_train = onehotbatch(y_train, 0:9)
y_test = onehotbatch(y_test, 0:9)

# Build the model
model = Chain(
    Conv((3, 3), 3 => 32, relu),
    MaxPool((2, 2)),
    Conv((3, 3), 32 => 64, relu),
    MaxPool((2, 2)),
    Conv((3, 3), 64 => 64, relu),
    flatten,
    Dense(576, 64, relu),
    Dense(64, 10)
)

# Move to GPU if available
if CUDA.functional()
    model = model |> gpu
    x_train = x_train |> gpu
    y_train = y_train |> gpu
    x_test = x_test |> gpu
    y_test = y_test |> gpu
end

# Define loss function
loss(x, y) = crossentropy(model(x), y)

# Define accuracy function
accuracy(x, y) = mean(onecold(model(x)) .== onecold(y))

# Train the model
opt = ADAM(0.001)
dataset = [(x_train, y_train)]
evalcb = () -> @show(accuracy(x_test, y_test))
Flux.train!(loss, params(model), dataset, opt, cb = throttle(evalcb, 10))`}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Notebooks</CardTitle>
          <CardDescription>Explore notebooks shared by the community</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No community notebooks have been shared yet.</p>
        </CardContent>
      </Card>
    </div>
  )
}
