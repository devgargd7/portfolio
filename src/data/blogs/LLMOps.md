# MLOps and Production Machine Learning Notes

Here are the structured MLOps notes based on the provided document, refined for clarity and corrected for spelling and grammar.

---

## ML Data Lifecycle in Production

### Production ML Systems

**Comparison**  
Production ML involves significantly more than just ML code. It requires configuration, data collection, verification, feature extraction, resource management, analysis tools, process management, serving infrastructure, and monitoring.

### System Lifecycle

- **Scoping**: Define the project and data needs.
- **Data**: Define data, establish baselines, label, and organize.
- **Modeling**: Select model, train, and perform error analysis.
- **Deployment**: Deploy to production, monitor, and maintain.

### Key Priorities

- Fast inference and good interpretability.
- Fairness and security in data collection.
- Handling dynamically shifting data.

---

## Data Labeling & Validation

### Labeling Types

- Human raters (generalists).
- Subject Matter Experts (SMEs).
- Users (via feedback).

**Challenges**

- Data drift and concept drift require continuous assessment.

### Data Validation Process

- Compare training data (baseline statistics + schema) against serving data statistics.
- Tools like TensorFlow Data Validation (TFDV) detect anomalies and trigger analysis.

---

## Feature Engineering

### TFX Pipeline (TensorFlow Extended)

The standard TFX pipeline includes:

- **ExampleGen**: Ingests data.
- **StatisticsGen**: Generates statistics.
- **SchemaGen**: Infers the schema.
- **Transform**: Performs feature engineering.
- **Trainer**: Trains the model.
- **Evaluator**: Evaluates performance.
- **Pusher**: Deploys the model for serving.

---

### Feature Selection Methods

| Method Type          | Description                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Filter Methods**   | Select features based on statistical scores (e.g., Pearson correlation, Chi-squared, ANOVA F-test, Mutual Information). Tools: SelectKBest, SelectPercentile. |
| **Wrapper Methods**  | Search for the best subset of features (e.g., forward selection, backward elimination, recursive feature elimination).                                        |
| **Embedded Methods** | Feature selection occurs during training (e.g., L1 regularization/Lasso, tree-based feature importance).                                                      |

---

### Feature Transformation Techniques

- **Scaling**: Z-score normalization.
- **Bucketing**: Quantiles, bucketization.
- **Vocabulary**: Mapping words to IDs (n-grams).
- **Dimensionality Reduction**: Reduce feature space.

---

## Data Journey & Storage

### Data Provenance

- **Data Lineage**: Chain of transformations that led to an artifact.
- **Flow**: Raw Data → Features & Labels → Model Input/Output Mapping.
- **Metadata Store**: Tracks artifacts, executions, and lineage.

---

### Feature Management (Feature Store)

**Pain Points**

- Hard to share and reuse features.
- Difficult low-latency production serving.
- Training–serving skew.

**Solution**

- Centralized repository for feature values.
- Batch and streaming ingestion.
- Online/offline consistency.

**Architecture**

- **Offline Store**: High latency, high throughput (batch).
- **Online Store**: Low-latency real-time serving.

---

## Hyperparameter Tuning & Neural Architecture Search

### Hyperparameter Tuning

- Tools: Cloud ML Engine, Keras Tuner.
- **Parameters**: Learned weights.
- **Hyperparameters**: Learning rate, layers, etc.

**Search Strategies**

- Grid Search
- Random Search
- Bayesian Optimization

---

### Neural Architecture Search (NAS)

- Automates neural network design (e.g., AutoML).
- Controller (RNN) samples architectures, trains child models, and updates based on reward.
- Uses lower-fidelity estimates and weight inheritance to reduce cost.

---

## Dimensionality Reduction

- **Curse of Dimensionality**: Sparsity, distance concentration, overfitting.

### Techniques

- **PCA**: Unsupervised; maximizes variance, minimizes reconstruction error.
- **LDA**: Supervised classification-based dimensionality reduction.
- **Matrix Factorization**: SVD, NMF; useful for sparse matrices.
- **ICA**: Assumes independent signals.  
  \( Y(t) = A S(t) \)
- **Quantization**: Convert float32 → int8 to reduce size and latency (post-training or QAT).

---

## Distributed Training

### Data Parallelism

- **Synchronous**: All workers update together (all-reduce).
- **Asynchronous**: Parameter server architecture.

### Pipeline Optimization

- Input pipeline: Extract → Transform → Load.
- Techniques: Prefetching, parallelism, caching, sharding.
- Memory constraints: Gradient accumulation, memory swap.

### Strategies

- `tf.distribute.MirroredStrategy`
- `tf.distribute.MultiWorkerMirroredStrategy`
- `tf.distribute.TPUStrategy`
- `tf.distribute.ParameterServerStrategy`

---

## Knowledge Distillation & Model Analysis

### Knowledge Distillation

- Compresses a large **Teacher** model into a smaller **Student**.
- Uses soft targets with KL divergence.
- Softmax with temperature \(T\):  
  \( p_i = \frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)} \)

### Model Analysis Tools

- TensorBoard
- TensorFlow Model Analysis (TFMA)

### Model Debugging

- Sensitivity analysis
- Partial dependence plots
- Residual analysis

---

## Model Monitoring & Security

### Model Remediation

- Data augmentation
- Fairness indicators
- Model editing

### Metrics

- TPR, FNR, AUC

### Adversarial Attacks

- Testing libraries: CleverHans, Foolbox

### Drift Detection

- **Types**: Data drift, concept drift, covariance shift, prior probability shift.
- **Methods**: SPC, sequential analysis, adaptive windowing, clustering.
- **Metrics**: Hellinger distance, Pearson correlation.

---

## Explainable AI (XAI)

### Interpretation Approaches

| Approach           | Description                                     |
| ------------------ | ----------------------------------------------- |
| **Intrinsic**      | Interpretable by design (linear models, trees). |
| **Post-hoc**       | Applied after training; black-box methods.      |
| **Model-specific** | Tailored to specific architectures.             |
| **Model-agnostic** | Applicable to any model.                        |

---

### Techniques

- **Global**: PDPs, permutation feature importance.
- **Local**:
  - Shapley Values (efficiency, symmetry, dummy, additivity).
  - SHAP
  - LIME
- **Others**: TCAV, Integrated Gradients, XRAI.

---

## Model Serving Infrastructure

### Optimization Goals

- Cost vs. complexity
- Accuracy vs. latency/throughput

### Hardware

- **GPU**: Parallel throughput.
- **TPU**: Large models and batches.

### Data Stores

- Redis, DynamoDB, Firestore, Bigtable.

### Serving Frameworks

- TensorFlow Serving
- Clipper
- KFServing
- NVIDIA Triton
- Managed platforms (e.g., Vertex AI)

### Scaling & Orchestration

- Prefer horizontal scaling.
- Kubernetes and Kubeflow for orchestration.

### Inference Patterns

- **Online**: Low-latency REST APIs.
- **Batch**: High-throughput offline processing.

---

## MLOps Levels & CI/CD

### Definition

- CI + CD + CT (Continuous Training).

### Automation Levels

- **Level 0**: Manual, script-driven.
- **Level 1**: ML pipeline automation.
- **Level 2**: CI/CD automation of pipelines.

### Deployment Strategies

- Blue/Green
- Canary
- A/B Testing
- Multi-Armed Bandits (MAB)

---

## Monitoring Systems

### ML Monitoring (Functional)

- Predictive performance
- Data drift
- Training–serving skew

### System Monitoring (Non-functional)

- Latency, CPU, RAM
- Uptime and reliability

**Observability Goals**

- Alertable
- Actionable

**Distributed Tracing**

- Dapper, Zipkin, Jaeger

---

## Retraining & Architectures

### Retraining Policies

- On-demand
- Scheduled
- Drift-triggered

### Dynamic Training Architectures

- **Static**: Precomputed predictions (low latency, high storage).
- **Dynamic**: Compute on demand.
- **Hybrid**: Cache popular items, compute long-tail.

---

## Data Processing Tools (GCP)

- **Dataflow**: Apache Beam-based batch and stream processing.
- **Cloud Composer**: Managed Airflow.
- **Dataproc**: Managed Spark/Hadoop.
- **BigQuery ML**: Train models using SQL.

**Limitation**

- Query latency makes BQ unsuitable for real-time inference.

---

## Drift Definitions (Deep Dive)

- **Data Drift**: Change in \( P(x) \).
- **Concept Drift**: Change in \( P(y \mid x) \).
- **Prediction Shift**: Change in \( P(\hat{y}) \).
- **Label Drift**: Change in \( P(y) \).

---

## Vertex AI & Pipelines

- **Kubeflow**: Kubernetes-native ML pipelines.
- **Vertex AI**:
  - AutoML
  - Custom training
  - Workbench
  - Pipelines
  - Feature Store
  - Model Monitoring

---

## Time Series

### Components

- Trend
- Seasonality
- Noise

### Processing

- Differencing for non-stationarity.
- Windowing (sliding windows).
- Forecasting: Naive, moving average, centered moving average.

---

## GCP ML Workflow Summary & Security

### End-to-End Workflow

- Ingestion: Pub/Sub or Cloud Storage
- Transformation: Dataflow or BigQuery
- Training: Vertex AI
- Evaluation: Experiments/Vizier
- Deployment: Vertex AI Prediction
- Orchestration: Pipelines or Cloud Composer

### Security

- DLP API for PII/PHI detection.
- VPC Service Controls.
- IAM for access management.

### Architecture Pattern

Input Event → Pub/Sub → Dataflow → BigQuery → Vertex AI (Prediction)

**Feedback Loop**

- Predictions logged for analysis and retraining.
