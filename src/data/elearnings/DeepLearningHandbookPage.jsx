import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Lightbulb,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";


export const chapters = [
  {
    "id": "group-1",
    "title": "1. Neural Network Foundations",
    "topics": [
      {
        "id": "what-is-deep-learning",
        "title": "What is Deep Learning?",
        "readTime": "12 min"
      },
      {
        "id": "neurons-and-layers",
        "title": "Neurons and Layers",
        "readTime": "12 min"
      },
      {
        "id": "forward-propagation",
        "title": "Forward Propagation",
        "readTime": "12 min"
      },
      {
        "id": "activation-functions",
        "title": "Activation Functions",
        "readTime": "12 min"
      },
      {
        "id": "loss-functions",
        "title": "Loss Functions",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-2",
    "title": "2. Training Neural Networks",
    "topics": [
      {
        "id": "backpropagation",
        "title": "Backpropagation",
        "readTime": "12 min"
      },
      {
        "id": "gradient-descent",
        "title": "Gradient Descent",
        "readTime": "12 min"
      },
      {
        "id": "optimisers",
        "title": "Optimisers",
        "readTime": "12 min"
      },
      {
        "id": "batch-size-and-epochs",
        "title": "Batch Size and Epochs",
        "readTime": "12 min"
      },
      {
        "id": "learning-rate-schedules",
        "title": "Learning-Rate Schedules",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-3",
    "title": "3. Generalisation and Stability",
    "topics": [
      {
        "id": "overfitting-and-underfitting",
        "title": "Overfitting and Underfitting",
        "readTime": "12 min"
      },
      {
        "id": "regularisation",
        "title": "Regularisation",
        "readTime": "12 min"
      },
      {
        "id": "dropout",
        "title": "Dropout",
        "readTime": "12 min"
      },
      {
        "id": "batch-normalisation",
        "title": "Batch Normalisation",
        "readTime": "12 min"
      },
      {
        "id": "weight-initialisation",
        "title": "Weight Initialisation",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-4",
    "title": "4. Convolutional Neural Networks",
    "topics": [
      {
        "id": "convolutional-layers",
        "title": "Convolutional Layers",
        "readTime": "12 min"
      },
      {
        "id": "padding-stride-and-receptive-fields",
        "title": "Padding, Stride and Receptive Fields",
        "readTime": "12 min"
      },
      {
        "id": "pooling-and-feature-maps",
        "title": "Pooling and Feature Maps",
        "readTime": "12 min"
      },
      {
        "id": "image-classification",
        "title": "Image Classification",
        "readTime": "12 min"
      },
      {
        "id": "data-augmentation",
        "title": "Data Augmentation",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-5",
    "title": "5. Transfer Learning and Vision",
    "topics": [
      {
        "id": "transfer-learning",
        "title": "Transfer Learning",
        "readTime": "12 min"
      },
      {
        "id": "fine-tuning-vision-models",
        "title": "Fine-Tuning Vision Models",
        "readTime": "12 min"
      },
      {
        "id": "object-detection",
        "title": "Object Detection",
        "readTime": "12 min"
      },
      {
        "id": "image-segmentation",
        "title": "Image Segmentation",
        "readTime": "12 min"
      },
      {
        "id": "vision-transformers",
        "title": "Vision Transformers",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-6",
    "title": "6. Sequence Models",
    "topics": [
      {
        "id": "sequence-data-fundamentals",
        "title": "Sequence Data Fundamentals",
        "readTime": "12 min"
      },
      {
        "id": "recurrent-neural-networks",
        "title": "Recurrent Neural Networks",
        "readTime": "12 min"
      },
      {
        "id": "lstms-and-grus",
        "title": "LSTMs and GRUs",
        "readTime": "12 min"
      },
      {
        "id": "bidirectional-networks",
        "title": "Bidirectional Networks",
        "readTime": "12 min"
      },
      {
        "id": "sequence-to-sequence-models",
        "title": "Sequence-to-Sequence Models",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-7",
    "title": "7. Attention and Transformers",
    "topics": [
      {
        "id": "attention-mechanism",
        "title": "Attention Mechanism",
        "readTime": "12 min"
      },
      {
        "id": "self-attention",
        "title": "Self-Attention",
        "readTime": "12 min"
      },
      {
        "id": "transformer-architecture",
        "title": "Transformer Architecture",
        "readTime": "12 min"
      },
      {
        "id": "embeddings-and-positional-encoding",
        "title": "Embeddings and Positional Encoding",
        "readTime": "12 min"
      },
      {
        "id": "fine-tuning-transformers",
        "title": "Fine-Tuning Transformers",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-8",
    "title": "8. Generative and Multimodal Deep Learning",
    "topics": [
      {
        "id": "autoencoders",
        "title": "Autoencoders",
        "readTime": "12 min"
      },
      {
        "id": "variational-autoencoders",
        "title": "Variational Autoencoders",
        "readTime": "12 min"
      },
      {
        "id": "generative-adversarial-networks",
        "title": "Generative Adversarial Networks",
        "readTime": "12 min"
      },
      {
        "id": "diffusion-models",
        "title": "Diffusion Models",
        "readTime": "12 min"
      },
      {
        "id": "multimodal-models",
        "title": "Multimodal Models",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-9",
    "title": "9. Production Deep Learning",
    "topics": [
      {
        "id": "model-evaluation",
        "title": "Model Evaluation",
        "readTime": "12 min"
      },
      {
        "id": "experiment-tracking",
        "title": "Experiment Tracking",
        "readTime": "12 min"
      },
      {
        "id": "inference-optimisation",
        "title": "Inference Optimisation",
        "readTime": "12 min"
      },
      {
        "id": "model-compression",
        "title": "Model Compression",
        "readTime": "12 min"
      },
      {
        "id": "deployment-and-monitoring",
        "title": "Deployment and Monitoring",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-10",
    "title": "10. Deep Learning Cheat Sheets",
    "topics": [
      {
        "id": "architecture-selection-cheat-sheet",
        "title": "Architecture Selection Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "training-cheat-sheet",
        "title": "Training Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "pytorch-cheat-sheet",
        "title": "PyTorch Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "computer-vision-cheat-sheet",
        "title": "Computer Vision Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "deep-learning-interview-cheat-sheet",
        "title": "Deep Learning Interview Cheat Sheet",
        "readTime": "12 min"
      }
    ]
  }
];
export const topicContent = {
  "what-is-deep-learning": {
    "eyebrow": "1. Neural Network Foundations",
    "title": "What is Deep Learning?",
    "summary": "Learn what is deep learning? through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind what is deep learning?.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# What is Deep Learning?",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me What is Deep Learning? in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement What is Deep Learning? for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "neurons-and-layers": {
    "eyebrow": "1. Neural Network Foundations",
    "title": "Neurons and Layers",
    "summary": "Learn neurons and layers through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "A neuron computes a weighted sum plus bias and applies an activation.",
      "Layers transform raw inputs into progressively useful representations.",
      "Depth allows networks to learn hierarchical features."
    ],
    "workflow": [
      "Define the input size.",
      "Choose hidden-layer widths and activations.",
      "Match the output layer to the task.",
      "Verify tensor shapes with a small batch."
    ],
    "mistakes": [
      "Using the wrong output size.",
      "Ignoring tensor dimensions.",
      "Adding depth without evidence or validation."
    ],
    "cheat": [
      "z = xW + b",
      "a = activation(z)",
      "Classification output size = number of classes",
      "Regression output size = number of target values"
    ],
    "prompts": [
      [
        "Concept tutor",
        "Explain neurons and layers using a small customer-churn network. Include input, hidden and output layers, weights, bias and activation functions."
      ],
      [
        "Architecture design",
        "Design a feed-forward neural network for [PROBLEM]. Specify input size, hidden layers, activations, output size, loss and evaluation metrics."
      ]
    ]
  },
  "forward-propagation": {
    "eyebrow": "1. Neural Network Foundations",
    "title": "Forward Propagation",
    "summary": "Learn forward propagation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind forward propagation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Forward Propagation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Forward Propagation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Forward Propagation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "activation-functions": {
    "eyebrow": "1. Neural Network Foundations",
    "title": "Activation Functions",
    "summary": "Learn activation functions through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind activation functions.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Activation Functions",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Activation Functions in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Activation Functions for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "loss-functions": {
    "eyebrow": "1. Neural Network Foundations",
    "title": "Loss Functions",
    "summary": "Learn loss functions through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind loss functions.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Loss Functions",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Loss Functions in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Loss Functions for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "backpropagation": {
    "eyebrow": "2. Training Neural Networks",
    "title": "Backpropagation",
    "summary": "Learn backpropagation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Backpropagation computes gradients using the chain rule.",
      "Gradients show how each parameter affects the loss.",
      "The optimiser uses gradients to update weights."
    ],
    "workflow": [
      "Run the forward pass.",
      "Compute the loss.",
      "Zero existing gradients.",
      "Call backward.",
      "Update parameters with the optimiser."
    ],
    "mistakes": [
      "Forgetting optimizer.zero_grad().",
      "Detaching tensors accidentally.",
      "Updating parameters before computing gradients."
    ],
    "cheat": [
      "optimizer.zero_grad()",
      "loss.backward()",
      "optimizer.step()",
      "Chain rule propagates gradients from output to earlier layers"
    ],
    "prompts": [
      [
        "Backprop tutor",
        "Explain backpropagation with one hidden neuron and a numeric example. Show forward pass, loss, derivative and weight update."
      ],
      [
        "Debug training",
        "Diagnose this PyTorch training loop for gradient-related bugs. Explain each issue and return corrected code. Code: [PASTE]."
      ]
    ]
  },
  "gradient-descent": {
    "eyebrow": "2. Training Neural Networks",
    "title": "Gradient Descent",
    "summary": "Learn gradient descent through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind gradient descent.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Gradient Descent",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Gradient Descent in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Gradient Descent for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "optimisers": {
    "eyebrow": "2. Training Neural Networks",
    "title": "Optimisers",
    "summary": "Learn optimisers through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind optimisers.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Optimisers",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Optimisers in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Optimisers for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "batch-size-and-epochs": {
    "eyebrow": "2. Training Neural Networks",
    "title": "Batch Size and Epochs",
    "summary": "Learn batch size and epochs through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind batch size and epochs.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Batch Size and Epochs",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Batch Size and Epochs in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Batch Size and Epochs for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "learning-rate-schedules": {
    "eyebrow": "2. Training Neural Networks",
    "title": "Learning-Rate Schedules",
    "summary": "Learn learning-rate schedules through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind learning-rate schedules.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Learning-Rate Schedules",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Learning-Rate Schedules in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Learning-Rate Schedules for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "overfitting-and-underfitting": {
    "eyebrow": "3. Generalisation and Stability",
    "title": "Overfitting and Underfitting",
    "summary": "Learn overfitting and underfitting through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind overfitting and underfitting.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Overfitting and Underfitting",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Overfitting and Underfitting in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Overfitting and Underfitting for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "regularisation": {
    "eyebrow": "3. Generalisation and Stability",
    "title": "Regularisation",
    "summary": "Learn regularisation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind regularisation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Regularisation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Regularisation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Regularisation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "dropout": {
    "eyebrow": "3. Generalisation and Stability",
    "title": "Dropout",
    "summary": "Learn dropout through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind dropout.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Dropout",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Dropout in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Dropout for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "batch-normalisation": {
    "eyebrow": "3. Generalisation and Stability",
    "title": "Batch Normalisation",
    "summary": "Learn batch normalisation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind batch normalisation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Batch Normalisation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Batch Normalisation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Batch Normalisation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "weight-initialisation": {
    "eyebrow": "3. Generalisation and Stability",
    "title": "Weight Initialisation",
    "summary": "Learn weight initialisation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind weight initialisation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Weight Initialisation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Weight Initialisation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Weight Initialisation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "convolutional-layers": {
    "eyebrow": "4. Convolutional Neural Networks",
    "title": "Convolutional Layers",
    "summary": "Learn convolutional layers through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Convolutional filters detect local patterns.",
      "Weight sharing reduces parameters.",
      "Deeper layers learn more abstract visual features."
    ],
    "workflow": [
      "Choose kernel size and number of filters.",
      "Set padding and stride.",
      "Track output spatial dimensions.",
      "Visualise feature maps when useful."
    ],
    "mistakes": [
      "Losing spatial dimensions too quickly.",
      "Using large kernels unnecessarily.",
      "Ignoring input channel order and normalisation."
    ],
    "cheat": [
      "Output size = floor((W - K + 2P)/S) + 1",
      "Conv2d(in_channels, out_channels, kernel_size)",
      "Common kernels: 3\u00d73",
      "Use ReLU after convolution"
    ],
    "prompts": [
      [
        "CNN explanation",
        "Explain convolutional layers using a 5x5 image and a 3x3 filter. Show how the feature map is created."
      ],
      [
        "CNN builder",
        "Design a compact CNN for [IMAGE TASK]. Include input shape, convolution blocks, pooling, classifier, loss and augmentation."
      ]
    ]
  },
  "padding-stride-and-receptive-fields": {
    "eyebrow": "4. Convolutional Neural Networks",
    "title": "Padding, Stride and Receptive Fields",
    "summary": "Learn padding, stride and receptive fields through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind padding, stride and receptive fields.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Padding, Stride and Receptive Fields",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Padding, Stride and Receptive Fields in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Padding, Stride and Receptive Fields for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "pooling-and-feature-maps": {
    "eyebrow": "4. Convolutional Neural Networks",
    "title": "Pooling and Feature Maps",
    "summary": "Learn pooling and feature maps through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind pooling and feature maps.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Pooling and Feature Maps",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Pooling and Feature Maps in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Pooling and Feature Maps for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "image-classification": {
    "eyebrow": "4. Convolutional Neural Networks",
    "title": "Image Classification",
    "summary": "Learn image classification through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind image classification.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Image Classification",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Image Classification in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Image Classification for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "data-augmentation": {
    "eyebrow": "4. Convolutional Neural Networks",
    "title": "Data Augmentation",
    "summary": "Learn data augmentation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind data augmentation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Data Augmentation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Data Augmentation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Data Augmentation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "transfer-learning": {
    "eyebrow": "5. Transfer Learning and Vision",
    "title": "Transfer Learning",
    "summary": "Learn transfer learning through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind transfer learning.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Transfer Learning",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Transfer Learning in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Transfer Learning for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "fine-tuning-vision-models": {
    "eyebrow": "5. Transfer Learning and Vision",
    "title": "Fine-Tuning Vision Models",
    "summary": "Learn fine-tuning vision models through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind fine-tuning vision models.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Fine-Tuning Vision Models",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Fine-Tuning Vision Models in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Fine-Tuning Vision Models for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "object-detection": {
    "eyebrow": "5. Transfer Learning and Vision",
    "title": "Object Detection",
    "summary": "Learn object detection through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind object detection.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Object Detection",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Object Detection in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Object Detection for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "image-segmentation": {
    "eyebrow": "5. Transfer Learning and Vision",
    "title": "Image Segmentation",
    "summary": "Learn image segmentation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind image segmentation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Image Segmentation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Image Segmentation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Image Segmentation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "vision-transformers": {
    "eyebrow": "5. Transfer Learning and Vision",
    "title": "Vision Transformers",
    "summary": "Learn vision transformers through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind vision transformers.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Vision Transformers",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Vision Transformers in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Vision Transformers for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "sequence-data-fundamentals": {
    "eyebrow": "6. Sequence Models",
    "title": "Sequence Data Fundamentals",
    "summary": "Learn sequence data fundamentals through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind sequence data fundamentals.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Sequence Data Fundamentals",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Sequence Data Fundamentals in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Sequence Data Fundamentals for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "recurrent-neural-networks": {
    "eyebrow": "6. Sequence Models",
    "title": "Recurrent Neural Networks",
    "summary": "Learn recurrent neural networks through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind recurrent neural networks.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Recurrent Neural Networks",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Recurrent Neural Networks in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Recurrent Neural Networks for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "lstms-and-grus": {
    "eyebrow": "6. Sequence Models",
    "title": "LSTMs and GRUs",
    "summary": "Learn lstms and grus through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind lstms and grus.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# LSTMs and GRUs",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me LSTMs and GRUs in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement LSTMs and GRUs for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "bidirectional-networks": {
    "eyebrow": "6. Sequence Models",
    "title": "Bidirectional Networks",
    "summary": "Learn bidirectional networks through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind bidirectional networks.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Bidirectional Networks",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Bidirectional Networks in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Bidirectional Networks for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "sequence-to-sequence-models": {
    "eyebrow": "6. Sequence Models",
    "title": "Sequence-to-Sequence Models",
    "summary": "Learn sequence-to-sequence models through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind sequence-to-sequence models.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Sequence-to-Sequence Models",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Sequence-to-Sequence Models in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Sequence-to-Sequence Models for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "attention-mechanism": {
    "eyebrow": "7. Attention and Transformers",
    "title": "Attention Mechanism",
    "summary": "Learn attention mechanism through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind attention mechanism.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Attention Mechanism",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Attention Mechanism in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Attention Mechanism for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "self-attention": {
    "eyebrow": "7. Attention and Transformers",
    "title": "Self-Attention",
    "summary": "Learn self-attention through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind self-attention.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Self-Attention",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Self-Attention in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Self-Attention for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "transformer-architecture": {
    "eyebrow": "7. Attention and Transformers",
    "title": "Transformer Architecture",
    "summary": "Learn transformer architecture through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Transformers rely on self-attention instead of recurrence.",
      "Multi-head attention captures different relationships.",
      "Residual connections and layer normalisation stabilise training."
    ],
    "workflow": [
      "Tokenise inputs.",
      "Create embeddings and positional information.",
      "Apply repeated attention and feed-forward blocks.",
      "Use a task-specific output head."
    ],
    "mistakes": [
      "Ignoring padding masks.",
      "Using sequence lengths beyond model limits.",
      "Fine-tuning with an excessively high learning rate."
    ],
    "cheat": [
      "Attention(Q,K,V) = softmax(QK\u1d40/\u221ad)V",
      "Block = attention + residual + norm + feed-forward + residual + norm",
      "Use masks for padding and causal tasks"
    ],
    "prompts": [
      [
        "Transformer tutor",
        "Explain transformer architecture from tokens to output. Include embeddings, positional encoding, self-attention, multi-head attention, feed-forward layers and residual connections."
      ],
      [
        "Fine-tuning plan",
        "Create a transformer fine-tuning plan for [TASK]. Include data format, model choice, tokenisation, max length, training parameters, metrics and error analysis."
      ]
    ]
  },
  "embeddings-and-positional-encoding": {
    "eyebrow": "7. Attention and Transformers",
    "title": "Embeddings and Positional Encoding",
    "summary": "Learn embeddings and positional encoding through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind embeddings and positional encoding.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Embeddings and Positional Encoding",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Embeddings and Positional Encoding in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Embeddings and Positional Encoding for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "fine-tuning-transformers": {
    "eyebrow": "7. Attention and Transformers",
    "title": "Fine-Tuning Transformers",
    "summary": "Learn fine-tuning transformers through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind fine-tuning transformers.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Fine-Tuning Transformers",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Fine-Tuning Transformers in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Fine-Tuning Transformers for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "autoencoders": {
    "eyebrow": "8. Generative and Multimodal Deep Learning",
    "title": "Autoencoders",
    "summary": "Learn autoencoders through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind autoencoders.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Autoencoders",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Autoencoders in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Autoencoders for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "variational-autoencoders": {
    "eyebrow": "8. Generative and Multimodal Deep Learning",
    "title": "Variational Autoencoders",
    "summary": "Learn variational autoencoders through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind variational autoencoders.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Variational Autoencoders",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Variational Autoencoders in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Variational Autoencoders for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "generative-adversarial-networks": {
    "eyebrow": "8. Generative and Multimodal Deep Learning",
    "title": "Generative Adversarial Networks",
    "summary": "Learn generative adversarial networks through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind generative adversarial networks.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Generative Adversarial Networks",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Generative Adversarial Networks in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Generative Adversarial Networks for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "diffusion-models": {
    "eyebrow": "8. Generative and Multimodal Deep Learning",
    "title": "Diffusion Models",
    "summary": "Learn diffusion models through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind diffusion models.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Diffusion Models",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Diffusion Models in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Diffusion Models for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "multimodal-models": {
    "eyebrow": "8. Generative and Multimodal Deep Learning",
    "title": "Multimodal Models",
    "summary": "Learn multimodal models through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind multimodal models.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Multimodal Models",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Multimodal Models in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Multimodal Models for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "model-evaluation": {
    "eyebrow": "9. Production Deep Learning",
    "title": "Model Evaluation",
    "summary": "Learn model evaluation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind model evaluation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Model Evaluation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Model Evaluation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Model Evaluation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "experiment-tracking": {
    "eyebrow": "9. Production Deep Learning",
    "title": "Experiment Tracking",
    "summary": "Learn experiment tracking through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind experiment tracking.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Experiment Tracking",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Experiment Tracking in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Experiment Tracking for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "inference-optimisation": {
    "eyebrow": "9. Production Deep Learning",
    "title": "Inference Optimisation",
    "summary": "Learn inference optimisation through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind inference optimisation.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Inference Optimisation",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Inference Optimisation in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Inference Optimisation for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "model-compression": {
    "eyebrow": "9. Production Deep Learning",
    "title": "Model Compression",
    "summary": "Learn model compression through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Quantisation reduces numeric precision.",
      "Pruning removes low-value parameters.",
      "Knowledge distillation trains a smaller student model."
    ],
    "workflow": [
      "Measure baseline accuracy, size and latency.",
      "Choose a compression method.",
      "Re-evaluate quality and hardware performance.",
      "Validate on real serving inputs."
    ],
    "mistakes": [
      "Optimising model size without measuring latency.",
      "Compressing before establishing a baseline.",
      "Testing only on development hardware."
    ],
    "cheat": [
      "Quantisation: FP32 \u2192 FP16/INT8",
      "Pruning: remove low-magnitude weights",
      "Distillation: student learns teacher outputs",
      "Always measure accuracy, memory and latency"
    ],
    "prompts": [
      [
        "Compression plan",
        "Design a model-compression strategy for [MODEL AND HARDWARE]. Compare quantisation, pruning and distillation with expected risks."
      ],
      [
        "Benchmark design",
        "Create a benchmarking plan for model size, latency, throughput, memory and quality before and after compression."
      ]
    ]
  },
  "deployment-and-monitoring": {
    "eyebrow": "9. Production Deep Learning",
    "title": "Deployment and Monitoring",
    "summary": "Learn deployment and monitoring through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind deployment and monitoring.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Deployment and Monitoring",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Deployment and Monitoring in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Deployment and Monitoring for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "architecture-selection-cheat-sheet": {
    "eyebrow": "10. Deep Learning Cheat Sheets",
    "title": "Architecture Selection Cheat Sheet",
    "summary": "Learn architecture selection cheat sheet through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind architecture selection cheat sheet.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Architecture Selection Cheat Sheet",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Architecture Selection Cheat Sheet in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Architecture Selection Cheat Sheet for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "training-cheat-sheet": {
    "eyebrow": "10. Deep Learning Cheat Sheets",
    "title": "Training Cheat Sheet",
    "summary": "Learn training cheat sheet through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind training cheat sheet.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Training Cheat Sheet",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Training Cheat Sheet in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Training Cheat Sheet for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "pytorch-cheat-sheet": {
    "eyebrow": "10. Deep Learning Cheat Sheets",
    "title": "PyTorch Cheat Sheet",
    "summary": "Learn pytorch cheat sheet through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind pytorch cheat sheet.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# PyTorch Cheat Sheet",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me PyTorch Cheat Sheet in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement PyTorch Cheat Sheet for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "computer-vision-cheat-sheet": {
    "eyebrow": "10. Deep Learning Cheat Sheets",
    "title": "Computer Vision Cheat Sheet",
    "summary": "Learn computer vision cheat sheet through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind computer vision cheat sheet.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Computer Vision Cheat Sheet",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Computer Vision Cheat Sheet in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Computer Vision Cheat Sheet for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  },
  "deep-learning-interview-cheat-sheet": {
    "eyebrow": "10. Deep Learning Cheat Sheets",
    "title": "Deep Learning Interview Cheat Sheet",
    "summary": "Learn deep learning interview cheat sheet through clear explanations, architecture decisions, implementation guidance, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the central idea behind deep learning interview cheat sheet.",
      "Connect the concept to data flow, tensor shapes and model behaviour.",
      "Know when the technique is useful and when a simpler approach is better."
    ],
    "workflow": [
      "Define the task and input-output structure.",
      "Choose the simplest suitable architecture or method.",
      "Train with a validation strategy.",
      "Inspect errors and learning curves.",
      "Document assumptions and results."
    ],
    "mistakes": [
      "Using complexity without a baseline.",
      "Ignoring tensor shapes or data leakage.",
      "Judging success from training metrics alone."
    ],
    "cheat": [
      "# Deep Learning Interview Cheat Sheet",
      "Define inputs \u2192 Build model \u2192 Train \u2192 Validate \u2192 Analyse errors",
      "Track shapes, loss, metric and learning rate",
      "Use small experiments before scaling"
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Deep Learning Interview Cheat Sheet in deep learning. Include intuition, equations, architecture diagrams in words, a PyTorch example, common mistakes and three exercises."
      ],
      [
        "Implementation helper",
        "Help me implement Deep Learning Interview Cheat Sheet for [TASK]. Ask for input shapes, dataset size and constraints, then provide a complete PyTorch workflow with validation."
      ]
    ]
  }
};

function getTheme(theme) {
  const isLight = ["light", "day", "white"].includes(String(theme).toLowerCase());
  return {
    isLight,
    page: isLight ? "bg-[#f7f8fb]" : "bg-[#050b16]",
    sidebar: isLight ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#091321]",
    card: isLight ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#0b1626]",
    text: isLight ? "text-[#101a35]" : "text-white",
    muted: isLight ? "text-slate-600" : "text-slate-400",
    soft: isLight ? "bg-slate-50" : "bg-white/[0.03]",
  };
}

function Sidebar({ theme, activeTopic, setActiveTopic, search, setSearch, mobileOpen, setMobileOpen }) {
  const styles = getTheme(theme);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.map((chapter) => ({
      ...chapter,
      topics: chapter.topics.filter((topic) => topic.title.toLowerCase().includes(q)),
    })).filter((chapter) => chapter.topics.length);
  }, [search]);

  return <>
    {mobileOpen && <button type="button" aria-label="Close chapters" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(330px,100vw)] flex-col border-r transition-transform duration-300 lg:sticky lg:top-0 lg:z-10 lg:h-screen lg:w-[330px] lg:translate-x-0 ${styles.sidebar} ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-5 dark:border-white/[0.08]">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white"><BookOpen className="h-5 w-5" /></span>
          <div><p className={`text-sm font-extrabold ${styles.text}`}>Deep Learning Handbook</p><p className={`mt-0.5 text-xs ${styles.muted}`}>50 chapters + cheat sheets</p></div>
        </a>
        <button type="button" onClick={() => setMobileOpen(false)} className={`grid h-11 w-11 place-items-center rounded-lg lg:hidden ${styles.soft} ${styles.muted}`} aria-label="Close chapters"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4"><div className="relative"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search 50 chapters" className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${styles.isLight ? "border-slate-200 bg-slate-50 text-slate-900 focus:border-violet-400 focus:bg-white" : "border-white/[0.08] bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-violet-400"}`} /></div></div>
      <nav className="flex-1 overflow-y-auto px-3 pb-5">
        {filtered.map((chapter) => <div key={chapter.id} className="mb-6"><p className={`px-3 text-[11px] font-bold uppercase tracking-[0.12em] ${styles.muted}`}>{chapter.title}</p><div className="mt-2 space-y-1">{chapter.topics.map((topic) => {
          const active = topic.id === activeTopic;
          return <button key={topic.id} type="button" onClick={() => { setActiveTopic(topic.id); setMobileOpen(false); window.scrollTo({top:0, behavior:"smooth"}); }} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${active ? styles.isLight ? "bg-violet-50 text-violet-700" : "bg-violet-500/12 text-violet-300" : styles.isLight ? "text-slate-600 hover:bg-slate-50" : "text-slate-400 hover:bg-white/[0.04]"}`}><span className="text-sm font-semibold leading-5">{topic.title}</span><span className="shrink-0 text-[10px] opacity-70">{topic.readTime}</span></button>;
        })}</div></div>)}
      </nav>
    </aside>
  </>;
}

function BulletSection({ title, items, icon: Icon, tone, theme }) {
  const styles = getTheme(theme);
  const tones = { violet: "bg-violet-50 text-violet-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600" };
  return <section className={`border-t py-8 first:border-t-0 first:pt-0 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><div className="flex items-start gap-3"><span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-[18px] w-[18px]" /></span><div className="min-w-0 flex-1"><h2 className={`text-xl font-extrabold tracking-[-0.02em] ${styles.text}`}>{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className={`flex items-start gap-3 ${styles.muted}`}><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" strokeWidth={3} /></span><span className="text-[15px] leading-6">{item}</span></li>)}</ul></div></div></section>;
}

function CheatCard({ items, theme }) {
  const styles = getTheme(theme);
  return <section className={`border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-50 text-cyan-600"><Code2 className="h-[18px] w-[18px]" /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600">Quick cheat sheet</p><h2 className={`mt-1 text-xl font-extrabold ${styles.text}`}>Key formulas, architecture rules and code</h2></div></div><div className={`mt-5 rounded-[16px] border p-5 ${styles.isLight ? "border-slate-200 bg-[#0f172a]" : "border-white/[0.08] bg-black/35"}`}><pre className="whitespace-pre-wrap font-mono text-[13px] leading-7 text-slate-200">{items.map((item) => `• ${item}`).join("\n")}</pre></div></section>;
}

function PromptCard({ item, index, theme }) {
  const styles = getTheme(theme);
  const [copied, setCopied] = useState(false);
  async function copyPrompt() { try { await navigator.clipboard.writeText(item.prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } }
  return <article className={`rounded-[18px] border p-5 sm:p-6 ${styles.isLight ? "border-violet-100 bg-violet-50/60" : "border-violet-400/15 bg-violet-500/[0.06]"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-600">Prompt {index+1}</p><h3 className={`mt-2 text-lg font-extrabold ${styles.text}`}>{item.title}</h3></div><button type="button" onClick={copyPrompt} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${styles.isLight ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-white/[0.08] bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]"}`}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button></div><pre className={`mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl p-5 font-mono text-[13px] leading-6 ${styles.isLight ? "bg-[#0f172a] text-slate-200" : "bg-black/35 text-slate-200"}`}>{item.prompt}</pre></article>;
}

export default function DeepLearningHandbookPage({ theme = "light" }) {
  const styles = getTheme(theme);
  const [activeTopic, setActiveTopic] = useState("what-is-deep-learning");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const allTopics = useMemo(() => chapters.flatMap((chapter) => chapter.topics), []);
  const activeIndex = allTopics.findIndex((topic) => topic.id === activeTopic);
  const current = topicContent[activeTopic] || topicContent["what-is-deep-learning"];
  const previousTopic = activeIndex > 0 ? allTopics[activeIndex - 1] : null;
  const nextTopic = activeIndex < allTopics.length - 1 ? allTopics[activeIndex + 1] : null;
  function changeTopic(topic) { if (!topic) return; setActiveTopic(topic.id); window.scrollTo({top:0, behavior:"smooth"}); }

  return <main className={`min-h-screen ${styles.page}`}><div className="lg:grid lg:grid-cols-[330px_minmax(0,1fr)]"><Sidebar theme={theme} activeTopic={activeTopic} setActiveTopic={setActiveTopic} search={search} setSearch={setSearch} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className="min-w-0"><header className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-6 lg:px-10 ${styles.isLight ? "border-slate-200 bg-white/90" : "border-white/[0.08] bg-[#050b16]/90"}`}><div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${styles.soft} ${styles.text}`}><Menu className="h-5 w-5" /></button><a href="/" className={`inline-flex items-center gap-2 text-sm font-semibold ${styles.muted}`}><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Learning materials</span></a></div><div className={`text-xs font-semibold ${styles.muted}`}>Chapter {activeIndex+1} of {allTopics.length}</div></header><div className="mx-auto max-w-[960px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"><article className={`overflow-hidden rounded-[24px] border ${styles.card}`}><div className="p-6 sm:p-9 lg:p-12"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">{current.eyebrow}</span><span className={`text-xs font-semibold ${styles.muted}`}>{allTopics[activeIndex]?.readTime}</span></div><h1 className={`mt-6 text-[38px] font-black leading-[1.05] tracking-[-0.045em] sm:text-[52px] ${styles.text}`}>{current.title}</h1><p className={`mt-5 max-w-3xl text-lg leading-8 ${styles.muted}`}>{current.summary}</p><div className="mt-10"><BulletSection title="What you need to understand" items={current.concepts} icon={Sparkles} tone="violet" theme={theme} /><BulletSection title="Recommended workflow" items={current.workflow} icon={Lightbulb} tone="amber" theme={theme} /><BulletSection title="Common mistakes to avoid" items={current.mistakes} icon={ShieldAlert} tone="rose" theme={theme} /><CheatCard items={current.cheat} theme={theme} /></div><section className={`mt-8 border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600">Ready-to-use prompts</p><h2 className={`mt-2 text-2xl font-black ${styles.text}`}>Learn, implement and debug</h2><p className={`mt-2 leading-7 ${styles.muted}`}>Replace the bracketed placeholders with your own dataset, model or architecture.</p><div className="mt-6 space-y-4">{current.prompts.map((prompt,index) => <PromptCard key={prompt.title} item={prompt} index={index} theme={theme} />)}</div></section></div></article><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" disabled={!previousTopic} onClick={() => changeTopic(previousTopic)} className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-violet-200" : "border-white/[0.08] bg-white/[0.03] hover:border-violet-400/30"}`}><ChevronLeft className={`h-5 w-5 ${styles.muted}`} /><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Previous chapter</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{previousTopic?.title || "You are at the beginning"}</span></span></button><button type="button" disabled={!nextTopic} onClick={() => changeTopic(nextTopic)} className={`flex min-h-[68px] items-center justify-between gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-violet-200" : "border-white/[0.08] bg-white/[0.03] hover:border-violet-400/30"}`}><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Next chapter</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{nextTopic?.title || "Guide completed"}</span></span><ChevronRight className={`h-5 w-5 ${styles.muted}`} /></button></div></div></div></div></main>;
}
