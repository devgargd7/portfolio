---
title: "Designing Data-Intensive Applications: My Notes"
date: "Feburary, 2023"
tags: ["System Design", "Notes"]
---

## Software System Concerns

- Reliability

- Scalability

- Maintainability


#### Reliability

- Continuing to work correctly, even when things go wrong.
  - **Fault**: A component of the system fails.
  - **Failure**: The system as a whole stops providing the required service to users.
  - **Netflix, Monkey**: Deliberately inducing faults.

##### Hardware Fault

- Add redundancy:
  - RAID for disks
  - Spare power supplies
  - Hot-swappable CPUs for servers
  - Backup power for datacenters
  - Multi-homed redundancy
  - Planned downtime
  - Rolling upgrade (for systems that can tolerate machine failure)

##### Software Errors

- Thorough testing
- Process isolation
- Allowing processes to crash and restart

##### Human Errors

- Design systems that minimize the opportunity for error
- Decouple the places where most human mistakes are made
- Thorough testing
- Quick recovery
- Monitoring
- Management practices

## Scalability

### Describing Load

- Using load parameters such as:
  - Requests/sec
  - Reads/sec
  - Writes/sec
  - Cache hit/miss ratio

### Describing Performance

- Using load parameters and system responses:
  - **Average Response Time**
  - **Tail Latencies**: High percentiles of response times (e.g., 95%, 99%, 99.9%)
  - **Algorithms for Approximation of Tail Latencies Percentiles**:
    - Forward decay
    - t-digest
    - HdrHistogram

### Approaches for Coping with Load

- **Scaling Up (Vertical)**: Adding more resources to a single machine.
- **Scaling Out (Horizontal)**: Distributing the load across multiple machines.

## Maintainability

### Operability

### Simplicity

- Abstraction to remove accidental complexity.

### Evolvability

## Data Models

### Relational vs. Schema-on-Write

- **Relational**:
  - Better support for joins
  - Many-to-one and many-to-many relationships

- **Schema-on-Write**:
  - Schema flexibility (schema-on-read)
  - Better performance due to locality
  - Depends on the data structure used by the application

## Query Languages for Data

### Declarative

- SQL, CSS, XSL

### Imperative

- IMS, CODASYL, Navigational Language

### Concise

- Better parallel insertion

## MapReduce

- Two functions (Map and Reduce)
- Later added declarative alternative: aggregation pipeline

## Graph-Like Data Models

### Property Graph

- Neo4j, Cypher Query Language

### Triple Stores

- SPARQL, RDF (Resource Description Framework) for semantic webs

### Datalog

## Storage & Indexing

### Log-Structured Storage Engines

#### Page-Oriented Storage Engines

##### Hash Indexes

- Appending data by segments (indexed)
- Performing segment merges

#### B-Trees

- Write-Ahead Log (WAL) (Redo log)

#### LSM-Trees (Log-Structured Merge-Trees)

- **Advantages**:
  - Merging segments is simple and efficient
  - Finding a key is efficient
  - Compression
- Separate log on disk to store recent writes, used in case of crashes
- Examples: LevelDB, RocksDB, HBase, Cassandra

##### Bloom Filters

- Approximate contents of a set for better performance when looking up keys that do not exist in the database

##### Size-Tiered Compaction

- Merge smaller SSTables into larger ones

##### Leveled Compaction

- Range split into smaller SSTables and consolidate into new levels

### B-Trees

- When adding new data, if needed, split and re-partition the data
- Branching factor: Number of references to child pages in one page
- Write-Ahead Log (WAL) (Redo log)
- B-Trees are faster for reads
- LSM-Trees sustain higher write throughput
- Compaction process can interfere with read operations
- B-Trees have each key existing in exactly one place in the index, whereas LSM-Trees may have multiple copies of the same key in different segments

### Other Indexing Structures

- Secondary Index
- Clustered Index
- Partial Index
- Bitmap Index
- In-Memory Database

## OLAP (Online Analytical Processing Systems)

### Data Warehouse

- Contains read-only copies of data in all versions from OLTP (Online Transaction Processing) systems in the company, using ETL (Extract, Transform, Load)
- Examples: Redshift, Apache Hive, Spark SQL, ClickHouse, BigQuery

### Star Schema

- The fact table represents events with dimensions such as who, what, when, where, why, surrounded by dimension tables

#### Snowflake Schema

- Dimensions are further broken down into sub-dimensions

### Column-Oriented Storage

- Examples include Redshift (based on C-Store)
  - Can be compressed (bitmap encoding)
  - Sort Order (first few columns sorted)

#### Materialized Views

- Aggregates (e.g., data cube)

#### Encoding

- Transforming in-memory representation to a byte sequence (serialization or marshalling), reverse is called decoding (parsing, deserialization, unmarshalling)
  - Examples: Java serialization, Thrift, Protocol Buffers, MessagePack, JSON

## Serialization Formats

### Binary Encoding

- Thrift and Protocol Buffers (binary encoding) do not have a parsing stage; instead, they use repeated method calls

### Apache Avro

- Based on schemas
- Backward and forward compatible
- Supports schema evolution

## Service Models

### SOA (Service-Oriented Architecture) / Microservices

### Web Services

- When HTTP is used as the underlying protocol
- Examples: Mobile app, web app (using APIs), middleware in microservices, public APIs

### REST

- Design philosophy
- Builds upon principles of HTTP
- API designed according to REST principles is called RESTful

### SOAP

- XML-based protocol
- Web services using most HTTP features
- Not commonly used over HTML standards
- API of a SOAP is described using WSDL (Web Services Description Language) (XML-based)

### RPCs (Remote Procedure Calls)

- Make a request to a remote network service, similar to making a function/method call (location transparency)
- Examples: gRPC (Protocol Buffers), Finagle (Thrift), REST

## Message-Passing Distributions

### Asynchronous Message Passing

- **Message Broker** (message queue/message-driven middleware)
- **Distributed Actor Frameworks**:
  - Actor model: For concurrency as a single thread rather than dealing with threads, logic is encapsulated in actors
  - Message delivery is not guaranteed
  - Examples: Akka, Orleans, Erlang OTP

## Distributed Data

### Vertical Scaling

- Shared-memory architecture

### Horizontal Scaling

- Shared-nothing architecture

## Replication

### Leader-Based Replication (Active/Passive or Master/Slave)

- Writes only on the leader, reads from any replica (leader or followers)
- **Asynchronous Follower**: Replicas eventually catch up with the leader
- **Synchronous Replication**: Ensures that all replicas have the same data
- Setting up new followers without locking the database
- **Multi-Leader Replication**:
  - High availability
  - Distributed writes
  - Scaling

## Handling Node Outages

### Follower Failure

- Catch-up recovery

### Leader Failure

- Failover
  - **Issues**:
    - Asynchronous replication (new leader not up to date)
    - Split brain (both nodes believe they are the leader)
    - Might thrash before the leader is declared dead

## Replication Logs

- **Statement-Based**
- **Write-Ahead Log (WAL)**
- **Row-Based (Logical Log)**
- **Trigger-Based**

### Problems

- **Read Scaling**: Will not work with asynchronous replication; to achieve, we have eventual consistency
- **Read-After-Write Consistency**
- **Monotonic Reads**: Ensure that each user always makes their reads from the same replica
- **Consistent Prefix Read**: Maintain order of writes
- **Multi-Leader Replication**: Explicit (master-master or active/active)

## Multi-Datacenter Replication

- Performance improvement over single-datacenter
- Tolerance of datacenter outage
- Tolerance of network partitions

## Collaborative Editing

### Handling Write Conflicts

- **Conflict Detection**
- **Conflict Avoidance**: Single master strategy for conflicts
- **Converging Toward a Consistent State**:
  - Last write wins
  - Merge values together
  - Defer conflict for some later time resolution
  - Custom logic:
    - On write (servers)
    - On read (clients)
- **Distributed Conflict Resolution**:
  - **Conflict-Free Replicated Data Types (CRDTs)** (2-way merge)
  - **Multi-Version Concurrency Control** (3-way merge)
  - Similar to list version control
  - **Operational Transformation** (e.g., Google Docs)
  - **Conflict Topology**:
    - Comparable: Star/tree, all-to-all
    - Version vectors, conflict resolution

## Partitioning (Sharding)

- Main purpose is scalability
- Combining replication and partitioning: Each node acts as a leader for some partitions and a follower for others

### Hot Spot

- A partition with disproportionately high load (skewed)

### Partitioning by Key Range

- May not be evenly spaced
- May require key sharding to avoid hot spots

### Hash of Key

- A good hash takes skewed data and makes it uniformly distributed (consistent hashing)
  - Inefficient range queries
  - With secondary indexes, partitioning by:
    - Document (local index)
    - Term (global index)

### Partitioning Strategies

- **Hash Modulo**: Easy to do as most of the key needs to be moved across nodes
- **Fixed Number of Partitions**
- **Dynamic Partitioning**: Suitable more for hash partitioning than range partitioning
- **Partitioning Proportional to Underlying Node**

## Request Routing (Service Discovery)

- **Client Contact Any Node**: Which can request to any appropriate node
- **Parallel to Any Appropriate Node**
- **Parallel to Any Node**

## Transactional Execution

### Transactions

- Grouped several reads and writes together into one logical unit (one operation): either it succeeds (commit) or it fails (abort, rollback for partial failure)
- **Safety Guaranteed by Transactions**: ACID (Atomicity, Consistency, Isolation, Durability)
- Systems not following ACID are called BASE (Basically Available, Soft State, and Eventual Consistency)

### Consistency

- Certain statements about the data (invariants) that must be true (e.g., account balance)

### Isolation

- Concurrently executing transactions are isolated from each other (performance is impacted)

### Durability

- Once a transaction has committed, all data it has written will not be forgotten, even if there is a hardware fault or the database crashes

### Complex Atomic Operations

- Increment operations
- Compare-and-set operations (allow only if not concurrently changed)

### Multi-Object Transactions

- **Relational Database**: With foreign keys
- **Document-Based**: Document is a single object
- **Secondary Indexes**

### Error Handling and Retry

- Not specified

### Weak Isolation Levels

#### Read Committed

- When reading from the database, only see data that has been committed
- When writing to the database, only overwrite data that has been committed (generally no dirty reads/writes)

### Snapshot Isolation

- Using multi-version concurrency control (MVCC)

### Serializability

#### Actual Serial Execution

- A system designed for single-threaded execution can sometimes perform better than a system that supports concurrency because it can avoid the contention overhead by locking
- However, its throughput is limited to one thread
- **Using Stored Procedures**: Instead of interactive transactions
- Data can be partitioned (depends on the data)
- **Two-Phase Locking**: Transactions can also block readers and writers
  - **Lock Modes**:
    - Shared mode (read lock)
    - Exclusive mode (write lock)
  - Performance and response time of transactions are significantly more than read committed (and are more prone to deadlocks)
  - **Predicate Locks**: Apply to all objects that match some search condition, rather than particular rows
  - **Index-Range Locks**

### Serializable Snapshot Isolation (SSI)

- Optimistic concurrency control
- On top of snapshot isolation, SSI adds an algorithm for determining serialization conflicts and aborts writes and determines which transactions to abort
- Transactions do not need to block waiting for locks held by another transaction

## Dealing with Distributed Systems

### Faults and Partial Failures

- For hardware faults, we prefer a computer to crash completely rather than running wrong results
- Partial failures are non-deterministic
- Fault handling must be part of the design

### Unreliable Networks

#### Shared-Nothing Systems

- Communicate through the network but cannot directly access each other's memory or disk
- **Detecting Faults**: Rapid heartbeats about a node's health are useful but cannot be counted upon
  - Only a few times, wait for a timeout, and eventually declare the node dead

### Network Congestion

- **TCP** performs flow control (congestion avoidance or back pressure) in which a node limits its rate of sending in order to avoid overloading a network link or the receiving node (prevents queuing at the sender's end)
- **TCP vs. UDP**: Exactly-once reliability and preserving order
  - For synchronous networks (like telephone): We have bounded delay (fixed max end-to-end latency) due to circuit switching (no queuing)
  - For TCP (IP, packet-switched protocols) suffers from queuing and thus unbounded delay
  - The band uses QoS (Quality of Service, prioritization, scheduling of packets) and tries to emulate circuit switching on packet networks

### Unreliable Clocks

#### Two Kinds of Clocks (Physical Clocks)

##### Time-of-Day Clock

- Returns the current date and time according to some standard
- Example: `System.currentTimeMillis()` in Java returns the number of milliseconds since the epoch, midnight UTC, Jan 1, 1970
- Synchronized with NTP (Network Time Protocol) so it may be forcibly reset or jump back in time

##### Monotonic Clock

- Suitable to measure duration
- Example: `System.nanoTime()` in Java
- NTP may adjust the frequency at which the clock ticks forward (slewing) but cannot make it jump backward

### Clock Accuracy

- Can be achieved using GPS receivers, Precision Time Protocol (PTP) with deployment and monitoring

### Logical Clocks

- Based on Lamport's Logical Clocks: Gives confidence intervals [earliest, latest] for the current time

### Process Pauses

- Could be due to a context switch in single-threaded, garbage collector, context switching, etc.
- For multi-threaded data processing systems, real-time guarantees are simply not economical or appropriate

## System Model

### Synchronous Model

- Assumes bounded network delay, bounded process pauses, and bounded clock error
  - Not practical

### Partially Synchronous Model

- Between synchronous models most of the time

### Asynchronous Model

- No timing assumptions
  - Does not even have a clock (i.e., no timeout)

### Fault Model

#### Crash-Stop Fault

- Assumes node can fail only by crashing (once down, never comes back)

#### Crash-Recovery Fault

- Nodes may recover after some time

#### Byzantine (Arbitrary) Faults

- Nodes may behave arbitrarily

### Linearizability

- Also known as atomic consistency, strong consistency, immediate consistency, or external consistency
  - Basic idea: Make a system appear as if there were only one copy of the data, and all operations on it are atomic
  - Necessary guarantee on reads and writes of a register (individual objects), does not prevent write skew
  - Multi-leader systems are not linearizable
  - Leaderless systems with eventual consistency do not provide linearizability

### CAP Theorem

- Either consistent or available when partitioned
  - Applications that require linearizability can be more tolerant to network problems
  - The reason for dropping linearizability is performance and not fault tolerance

### Ordering Guarantees

#### Causality

- The chain of causally dependent operations defines the causal order in the system, i.e., what happened before what
  - If a system obeys the ordered aspect of causality, we say that it is causally consistent
  - **Total Order**: Allows any two elements to be compared, and we can always determine which one is greater/smaller
  - For linearizability, we have total order of operations
  - For causality, we have partial order, as we have a term for concurrent operations

#### Sequence Number Ordering (Timestamp Ordering)

##### Lamport Timestamps

- (Counter, Node ID)

### Total Order Broadcast

- Requires two properties to be satisfied:
  - Reliable delivery
  - Total ordered delivery
  - The idea of eventual total order is captured as follows:
    - **State Machine Replication**: If every message represents a write to the database and every replica processes the same writes in the same order, then the replicas will remain consistent with each other

## Distributed Transactions & Consensus

### When to Use Consensus

- Leader election
- Atomic commit

### If an Algorithm is Allowed to Use Timeouts

- Or any other way of identifying suspected crashed nodes, then consensus is solvable (as to get around the impossibility result of FLP)

### Single Leader

#### Two-Phase Commit (2PC)

- The database makes the transaction's writes durable (typically in a write-ahead log) and then appends a commit record to the log on disk
- A transaction commit must be idempotent (basis of read committed isolation)

### Two-Phase Commit (2PC)

- **Coordinator** (new component) sends a prepare request to each of the nodes, asking them if they can commit
- If all nodes agree, the coordinator sends a commit request
- If any node disagrees, the coordinator sends an abort request to all nodes
- **Commit Point**: Before sending the commit request, the coordinator and the participants will be expected to perform the commit (even if they have to retry)
- If the coordinator fails/crashes after phase 1, the participants need to wait in doubt/uncertain

### Three-Phase Commit (3PC)

- Assumes a network with bounded delay and nodes with bounded response time

### Distributed Transactions

- **Distributed Internal Distributed Transaction**
- **Metamorphosed Distributed Transaction**
- **XA Transaction (Extended Architecture)**: Implements 2PC with heterogeneous technologies

### Fault-Tolerant Consensus

- A consensus algorithm satisfies:
  - **Uniform Agreement**: No two nodes decide differently
  - **Validity**: No node decides twice
  - **Termination**: Every node that does not crash eventually decides some value

- Most implementations of consensus ensure that the safety properties are always met
- Assumes no Byzantine failures, i.e., if a node does not follow the protocol, it may break the safety properties of the protocol
- Most fault-tolerant consensus algorithms (e.g., Paxos, Raft, Zab) are total order broadcast algorithms, so they decide on a sequence of values
- Total order broadcast is equivalent to repeated rounds of consensus
- To avoid split brain in case of single-leader replication, consensus is needed to elect a leader

### Consensus Protocols

- Demand guarantee that the leader is unique; if they can make a weaker guarantee, using 'epoch number' and 'parameter within each epoch, the leader is unique
- Before a leader is allowed to decide anything, it must first check that there's no other leader with a higher epoch number
- Thus, we have consensus votes from nodes
- These votes are kind of synchronous

### Zookeeper's Features

- Linearizable atomic operations
- Total ordering of operations
- Failure detection
- Change notification

## Batch Processing with MapReduce

### HDFS (Hadoop Distributed File System)

- Based on shared-nothing principle, in contrast to shared-disk approach of Network Attached Storage (NAS) and Storage Area Network (SAN) architectures
- Consists of a daemon process running on each machine to allow other nodes to access files stored on that machine, a central server called 'NameNode' keeps track of which file blocks are stored on which machine
- Replication: Copied files or using erasure coding

### Steps for MapReduce

1. Read input files and break them up into records
2. Call mapper function to extract key-value pairs
3. Sort all key-value pairs by key
4. Call reduce function

- Number of mapper tasks is determined by the size of input blocks, number of reducer tasks is configured by users
- Sorting is performed in stages
- MapReduce jobs are chained (without intermediate materialization to temporary files)

### Reduce-Side Join/Aggregation

#### Sort-Merge Join

- Mapper output is sorted by key, and reducers then merge together the sorted lists of records from both sides of the join (using secondary sort by, e.g., first by user ID, then by timestamp)

### Map-Side Join

- If we can make certain assumptions about some input data, it is possible to make joins faster

### Broadcast Hash Join

- For joining large datasets to small datasets

### Partitioned Hash Joins (or Bucketed Map Joins)

- Only works if both of the join's inputs have the same number of partitions, with records assigned to partitions based on the same key and same hash function

## Data Flow Engines

- Examples: Spark, Tez, Flink
- Handle the entire workflow as one job rather than breaking it up into independent operations
- Often called operators rather than alternating map and reduce

### Advantages Over MapReduce

- No sorting required between map and reduce stages
- Two-way steps can be combined with preceding reduce
- Locality optimization
- Less I/O (no materialization)
- No wait for operations, and no new JVM
- Fault tolerance in the absence of materialization: Recomputation from the data is done
  - Example: Spark uses RDD (Resilient Distributed Dataset), better to make operations deterministic

## Stream Processing

- Can't be generated once by producers (publishers), then potentially processed by multiple consumers/subscribers/replicas
- Related events are grouped together into topics or streams
- Nothing the need for new data is expensive, so some artificial mechanism (triggers) are needed

### Messaging Systems

#### Publish/Subscribe Model

- Two questions:
  - Producers and consumers can continue
  - Drop messages
  - Queues
  - Keep messages
  - Load balancing
  - Message replication (replay from the beginning)

### Direct Messaging

- Examples: UDP multicast, ZeroMQ (brokerless over TCP/IP multicast), StatsD & Graphite (metrics over UDP), direct HTTP or RPC calls (unidirectional)

### Message Broker/Queue

- Consumers are asynchronous
- Some message systems use 2-phase commit using XA/JTA for multiple consumers
- Two properties:
  - **Acknowledgment by Broker**: A direct mode of which messages have not been processed
  - **Externalization by Broker**: A direct mode so that it has finished processing messages
  - For the broker to remove the message from the queue

### Partition Logs (Log-Based Brokers)

- Hybrid approach, combining the durable stores of databases within the same latency
- Examples: Apache Kafka, Amazon Kinesis Streams, Twitter, Google Cloud Pub/Sub (with JMS-like API)
- Uses offset for every message within each partition
- No need for tracking acknowledgment
- Any consumer, just periodic check of consumer offset, have need to be durable
- Higher throughput

## Databases & Streams

### Keeping Systems in Sync

- Full database dumps are slower; alternative is dual write, code explicitly writes to each system when data changes (e.g., first to DB, then to search index)
- But this can lead to race conditions

### Change Data Capture (CDC)

- Process of observing all data changes written to a database and extracting them in a form in which they can be replicated to other systems
  - Using database triggers
  - Log compaction: Log records with memory log and periodically throw away duplicates
  - Event sourcing: The application logic is explicitly built on the basis of immutable events that are written to an event log

### Processing Streams

#### Complex Event Processing (CEP)

- For searching specific patterns

#### Stream Analytics

- Uses probabilistic algorithms
  - Materialized views refer to aggregates (e.g., data cube)
  - Search on streams (specifications are stored, documents are passed through the query, like CEP)
  - Message joining (CEP)

### Timestamps

- **Event Time**: The time at which the event occurred, according to the device clock
- **Processing Time**: The time at which the event was sent to the driver, according to the device clock
- **Ingestion Time**: The time at which the event was received by the server, according to the server clock

### Types of Windows

- **Tumbling Window**: Fixed length, each event belongs to one window
- **Hopping Window**: Fixed length, windows can overlap (smoothing)
- **Sliding Window**: Contains all events that occur within some interval of time
- **Session Window**: Group all events for the same user that occur closely together

### Stream Joins

- **Stream-Stream Join (Window Join)**
- **Stream-Table Join (Stream Enrichment)**
- **Table-Table Join (Materialized View Join)**

### Problems with Time

- Slowly changing dimension

### Fault Tolerance

- Microbatching and checkpoints
- Stream commit
- Replayability
