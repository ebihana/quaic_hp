"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Models</h2>
        <Button>Upload New Model</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">CNN_v1</TableCell>
                <TableCell>TensorFlow</TableCell>
                <TableCell>87.5%</TableCell>
                <TableCell>May 20, 2025</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Deployed
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>CNN_v1 - Model Code</DialogTitle>
                        <DialogDescription>
                          Jupyter Notebook format showing the complete model implementation
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="notebook" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="notebook">Notebook</TabsTrigger>
                          <TabsTrigger value="python">Python Script</TabsTrigger>
                          <TabsTrigger value="config">Config</TabsTrigger>
                        </TabsList>
                        <TabsContent value="notebook" className="space-y-4">
                          <div className="border rounded-lg bg-white">
                            {/* Cell 1 - Imports */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [1]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report`}</code>
                              </pre>
                            </div>

                            {/* Cell 2 - Data Loading */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [2]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`# Load and preprocess data
def load_data():
    # Load your dataset here
    (x_train, y_train), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()
    
    # Normalize pixel values
    x_train = x_train.astype('float32') / 255.0
    x_test = x_test.astype('float32') / 255.0
    
    return (x_train, y_train), (x_test, y_test)

(x_train, y_train), (x_test, y_test) = load_data()
print(f"Training data shape: {x_train.shape}")
print(f"Test data shape: {x_test.shape}")`}</code>
                              </pre>
                              <div className="mt-2 text-sm text-gray-600">
                                Training data shape: (50000, 32, 32, 3)
                                <br />
                                Test data shape: (10000, 32, 32, 3)
                              </div>
                            </div>

                            {/* Cell 3 - Model Definition */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [3]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`# Build CNN model
def create_cnn_model():
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    
    return model

model = create_cnn_model()
model.summary()`}</code>
                              </pre>
                              <div className="mt-2 text-sm text-gray-600 font-mono">
                                Model: "sequential"
                                <br />
                                _________________________________________________________________
                                <br />
                                Total params: 122,570
                                <br />
                                Trainable params: 122,570
                                <br />
                                Non-trainable params: 0
                              </div>
                            </div>

                            {/* Cell 4 - Training */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [4]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`# Compile and train model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    x_train, y_train,
    batch_size=32,
    epochs=50,
    validation_data=(x_test, y_test),
    verbose=1
)

# Final evaluation
test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
print(f"Test accuracy: {test_accuracy:.4f}")`}</code>
                              </pre>
                              <div className="mt-2 text-sm text-gray-600">
                                Epoch 50/50
                                <br />
                                1563/1563 [==============================] - 12s 8ms/step
                                <br />
                                Test accuracy: 0.8750
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="python" className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <pre className="text-sm overflow-x-auto">
                              <code>{`#!/usr/bin/env python3
"""
CNN Model v1 - Image Classification
Created: May 20, 2025
Framework: TensorFlow 2.x
"""

import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

class CNNModel:
    def __init__(self, input_shape=(32, 32, 3), num_classes=10):
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = self._build_model()
    
    def _build_model(self):
        model = models.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', 
                         input_shape=self.input_shape),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            
            layers.Flatten(),
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(self.num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train(self, x_train, y_train, x_val, y_val, epochs=50):
        history = self.model.fit(
            x_train, y_train,
            batch_size=32,
            epochs=epochs,
            validation_data=(x_val, y_val),
            verbose=1
        )
        return history
    
    def evaluate(self, x_test, y_test):
        return self.model.evaluate(x_test, y_test, verbose=0)

if __name__ == "__main__":
    # Initialize and train model
    cnn = CNNModel()
    # Add your training code here`}</code>
                            </pre>
                          </div>
                        </TabsContent>
                        <TabsContent value="config" className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <pre className="text-sm overflow-x-auto">
                              <code>{`{
  "model_name": "CNN_v1",
  "framework": "TensorFlow",
  "version": "2.13.0",
  "created_date": "2025-05-20",
  "accuracy": 0.875,
  "parameters": {
    "total_params": 122570,
    "trainable_params": 122570,
    "non_trainable_params": 0
  },
  "hyperparameters": {
    "optimizer": "adam",
    "learning_rate": 0.001,
    "batch_size": 32,
    "epochs": 50,
    "dropout_rate": 0.5
  },
  "architecture": {
    "input_shape": [32, 32, 3],
    "conv_layers": [
      {"filters": 32, "kernel_size": [3, 3], "activation": "relu"},
      {"filters": 64, "kernel_size": [3, 3], "activation": "relu"},
      {"filters": 64, "kernel_size": [3, 3], "activation": "relu"}
    ],
    "dense_layers": [
      {"units": 64, "activation": "relu"},
      {"units": 10, "activation": "softmax"}
    ]
  },
  "training_config": {
    "loss": "sparse_categorical_crossentropy",
    "metrics": ["accuracy"],
    "validation_split": 0.2,
    "early_stopping": false
  }
}`}</code>
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ResNet50_fine_tuned</TableCell>
                <TableCell>PyTorch</TableCell>
                <TableCell>92.1%</TableCell>
                <TableCell>May 18, 2025</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Training
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>ResNet50_fine_tuned - Model Code</DialogTitle>
                        <DialogDescription>
                          Jupyter Notebook format showing the ResNet50 fine-tuning implementation
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="notebook" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="notebook">Notebook</TabsTrigger>
                          <TabsTrigger value="python">Python Script</TabsTrigger>
                          <TabsTrigger value="config">Config</TabsTrigger>
                        </TabsList>
                        <TabsContent value="notebook" className="space-y-4">
                          <div className="border rounded-lg bg-white">
                            {/* Cell 1 - Imports */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [1]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from torch.utils.data import DataLoader`}</code>
                              </pre>
                            </div>

                            {/* Cell 2 - Model Setup */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [2]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`# Load pre-trained ResNet50 and modify for fine-tuning
model = models.resnet50(pretrained=True)

# Freeze early layers
for param in model.parameters():
    param.requires_grad = False

# Replace final layer for our classes
model.fc = nn.Linear(model.fc.in_features, 10)

# Unfreeze last few layers for fine-tuning
for param in model.layer4.parameters():
    param.requires_grad = True
for param in model.fc.parameters():
    param.requires_grad = True

print(f"Model loaded and modified for fine-tuning")`}</code>
                              </pre>
                              <div className="mt-2 text-sm text-gray-600">
                                Model loaded and modified for fine-tuning
                              </div>
                            </div>

                            {/* Cell 3 - Training */}
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-mono text-gray-600">In [3]:</div>
                            <div className="p-4">
                              <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
                                <code>{`# Training configuration
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(20):
    model.train()
    running_loss = 0.0
    
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
    
    print(f'Epoch {epoch+1}/20, Loss: {running_loss/len(train_loader):.4f}')

print("Training completed!")`}</code>
                              </pre>
                              <div className="mt-2 text-sm text-gray-600">
                                Epoch 20/20, Loss: 0.1234
                                <br />
                                Training completed!
                                <br />
                                Final accuracy: 92.1%
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="python" className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <pre className="text-sm overflow-x-auto">
                              <code>{`#!/usr/bin/env python3
"""
ResNet50 Fine-tuned Model
Created: May 18, 2025
Framework: PyTorch
"""

import torch
import torch.nn as nn
import torchvision.models as models

class ResNet50FineTuned(nn.Module):
    def __init__(self, num_classes=10):
        super(ResNet50FineTuned, self).__init__()
        self.resnet = models.resnet50(pretrained=True)
        
        # Freeze early layers
        for param in self.resnet.parameters():
            param.requires_grad = False
            
        # Modify final layer
        self.resnet.fc = nn.Linear(self.resnet.fc.in_features, num_classes)
        
        # Unfreeze last layers for fine-tuning
        for param in self.resnet.layer4.parameters():
            param.requires_grad = True
        for param in self.resnet.fc.parameters():
            param.requires_grad = True
    
    def forward(self, x):
        return self.resnet(x)`}</code>
                            </pre>
                          </div>
                        </TabsContent>
                        <TabsContent value="config" className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <pre className="text-sm overflow-x-auto">
                              <code>{`{
  "model_name": "ResNet50_fine_tuned",
  "framework": "PyTorch",
  "version": "1.13.0",
  "created_date": "2025-05-18",
  "accuracy": 0.921,
  "base_model": "ResNet50",
  "pretrained": true,
  "fine_tuning": {
    "frozen_layers": ["conv1", "bn1", "layer1", "layer2", "layer3"],
    "trainable_layers": ["layer4", "fc"],
    "learning_rate": 0.001,
    "epochs": 20
  }
}`}</code>
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
          <CardDescription>Compare the performance of your models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/40">
            <p className="text-muted-foreground">Performance chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
