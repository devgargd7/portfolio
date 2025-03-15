---
title: "Designing Data-Intensive Applications: My Notes"
date: "Feburary, 2023"
tags: ["System Design", "Notes"]
---

> Based on **Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems** - Book by Martin Kleppmann

---

## Software System Concerns

- Reliability
- Scalability
- Maintainability


### Reliability

Continuing to work correctly, even when things go wrong.
  - **Fault**: A component of the system fails deviating from specifications.
  - **Failure**: When system as a whole stops providing the required service to users.
  - **Netflix Chaos Monkey Test**: Deliberately inducing faults.

#### Hardware Fault

- Add redundancy:
  - RAID for disks
  - Spare power supplies
  - Hot-swappable CPUs for servers
  - Backup power for datacenters
  - Multi-machine redundancy
  - Planned downtime
  - Rolling upgrade (for systems that can tolerate machine failure)

#### Software Errors

- Thorough testing
- Process isolation
- Allowing processes to crash and restart

#### Human Errors

- Design systems that minimize the opportunity for error
- Decouple the places where most human mistakes are made
- Thorough testing
- Quick and easy recovery
- Monitoring
- Management practices

### Scalability

#### Describing Load
Using load parameters such as:
  - Requests/sec
  - Reads-to-Write ratio
  - Hit rate on Cache

#### Describing Performance
Using load parameters and system resources:
  - **Average Response Time**
  - **Tail Latencies**: High percentiles of response times (e.g., 95%, 99%, 99.9%)
  - **Algorithms for Approximation of Tail Latencies Percentiles**:
    - Forward decay
    - t-digest
    - HdrHistogram

#### Approaches for Coping with Load

- **Scaling Up (Vertical)**: Adding more resources to a single machine.
- **Scaling Out (Horizontal)**: Distributing the load across multiple machines.

### Maintainability

- #### Operability

- #### Simplicity

  - Abstraction to remove accidental complexity.

- #### Evolvability

## Data Models


- **Relational**:
  - Better support for joins
  - Many-to-one and many-to-many relationships
  - Schema-on-write

- **Document DBs**:
  - Schema flexibility (schema-on-read)
  - Better performance due to locality
  - It can be closer to the data structure used by the application

### Query Languages for Data

#### Declarative

- SQL, CSS, XSL
- Concise
- Better parallel insertion

#### Imperative

- IMS, CODASYL, Programming Languages

#### MapReduce

- Two JS functions to MongoDB: Map (collect) and Reduce (inject)
- Later added declarative alternative: aggregation pipeline

#### Graph-Like Data Models

##### Property Graph

- Neo4j, Cypher Query Language

##### Triple Stores

- SPARQL, RDF (Resource Description Framework) for semantic webs

#### Datalog



## Storage and Retrieval

### Log-Structured Storage Engines

##### Hash Indexes

- Append log: create data log segments (indexed) and perform compaction after size limit reached, and merge with other compacted segments.
- **Issues**: File Format, Deleting Records, Crash Recovery, partially written records, concurrency control

#### SSTables *(Sorted String Tables)* and LSM-Trees *(Log-Structured Merge-Trees)*

- **Advantages**:
  - Merging segments is simple and efficient (mergesort)
  - Finding a key is efficient
  - Compression (group several key-value pairs)
- Separate log on disk to store recent writes, used in case of crashes
- After *memtable* written to an SSTable, corresponding log can be discarded 
- Examples: LevelDB, RocksDB, HBase, Cassandra

##### Bloom Filters

- Approximate contents of a set for better performance when looking up keys that do not exist in the database

##### Size-Tiered Compaction

- Merge new and smaller SSTables into old and larger ones

##### Leveled Compaction

- Range split into smaller SSTables and consolidate into new levels

### Page-Oriented Storage Engines
#### B-Trees

- When adding new data, if needed, split and re-partition the data with fixed page size
- Branching factor: Number of references to child pages in one page
- Write-Ahead Log (WAL) (Redo log)
- Latches (for concurrency lock)

##### Comparison with LSM-Trees
- B-Trees are faster for reads, LSM-Trees are faster for writes
- LSM-Trees sustain higher write throughput (as sometimes they have lower write amplification)
- Compaction process can interfere with ongoing disk operations
- B-Trees have each key existing in exactly one place in the index, whereas LSM-Trees may have multiple copies of the same key in different segments

#### Other Indexing Structures

- Secondary Index
- Clustered Index
- Partial Index
- Bitmap Index
- In-Memory Database

### OLAP (Online Analytical Processing Systems)
- Disk Bandwidth is bottleneck

#### Data Warehouse

- Contains read-only copies of data in all variants of OLTP (Online Transaction Processing) systems, where disk seek time is bottleneck, using ETL (Extract, Transform, Load)
- Examples: Redshift, Apache Hive, Spark SQL, Cloudera Impala, Presto, (SQL on hadoop open-sourced)

#### Star Schema

- The fact table represents events with dimensions such as who, what, when, where, why; is visualized in the middle surrounded by dimension tables

#### Snowflake Schema

- Dimensions are further broken down into sub-dimensions

### Column-Oriented Storage

- Examples include Parquet (based on Google Dremel)
- Can be compressed (bitmap encoding)
- Sort Order (first few columns sorted)

### Materialized Views

- Aggregates 
- Data cube (OLAP cube): grid of aggregates group by different dimensions

## Encoding

- Translation from in-memory representation to a byte sequence,e.g., JSON document (serialization or marshalling)
- Reverse is called decoding (parsing, deserialization, unmarshalling)
- Examples: 
    - Language Specific
      - Java serialization: ```java.io.serializable```
      - Ruby: ```marshall```
      - Python: ```pickle```
      - ```kryo``` in Java
    - Language independent
      - JSON, XML, CSV

### Binary Encoding
- Examples: JSON (MessagePack), BSON, BISON, XML (WBXML), Fast infoset
- Thrift and Protocol Buffers (binary encoding) do not have a list/array datatype stage; instead, they use **repeated** markers

### Apache Avro
- Based on schemas

## Modes of Dataflow
### Through DBs
  - Backward and forward compatible
  - Data outlines code, supports schema evolution

### Through Services

#### SOA (Service-Oriented Architecture) / Microservices

#### Web Services

- When HTTP is used as the underlying protocol
- Examples: Native app, JS web app (using Ajax), middleware in microservices, public APIs

#### REST

- Design philosophy (not protocol)
- Builds upon principles of HTTP
- API designed according to REST principles is called **RESTful**

#### SOAP

- XML-based protocol
- avoids using most HTTP features
- Not commonly used over HTML standards
- API of a SOAP is described using WSDL (Web Services Description Language) (XML-based)
- Too complex to construct manually

#### RPCs (Remote Procedure Calls)

- Make a request to a remote network service, similar to making a function/method call (location transparency)
- Examples: gRPC (Protocol Buffers), Finagle (Thrift), REST.li
- Performace: RPC protocols with binary encoding >>> JSON over REST

### Message-Passing Distributions

#### Asynchronous Message Passing

- **Message Broker** (message queue/message-oriented middleware)
  - ensure that message delivered to one or more consumers/subscribers of that queue/topic
- **Distributed Actor Frameworks**:
  - Actor model: For concurrency in a single process rather than dealing with threads, logic is encapsulated in actors
  - Message delivery is not guaranteed
  - Examples: Akka, Orleans, Erlang OTP

---

# Distributed Data

- Vertical Scaling: Shared-memory architecture, Shared-disk architecture
- Horizontal Scaling: Shared-nothing architecture

## Replication
Why Replication:
  - High availability
  - Distributed writes
  - Scaling
### Leader-Based Replication (Active/Passive or Master/Slave)
Writes only on the leader, reads from any replica (leader or followers)
#### Asynchronous Follower: 
Replicas eventually catch up with the leader
#### Synchronous Follower: 
Ensures that all replicas have the same data
#### Semi-Synchronous: 
Atleast one synchronous replica and others can be asynchronous

#### Setting up new followers without locking the database


### Handling Node Outages

#### Follower Failure

- Catch-up recovery

#### Leader Failure

- Failover
- **Issues**:
  - Asynchronous replication (new leader not up to date)
  - Split brain (both nodes believe they are the leader)
  - Might timeout before the leader is declared dead

### Replication Logs

- **Statement-Based**
- **Write-Ahead Log (WAL)**
- **Row-Based (Logical Log)**
- **Trigger-Based**

#### Problems

- **Read Scaling**: Will not work with synchronous replication; to achieve in asynchronous, we have eventual consistency
- **Read-After-Write Consistency**
- **Monotonic Reads**: Avoid seeing things moving back in time (e.g., Ensure that each user always makes their reads from the same replica)
- **Consistent Prefix Read**: Maintain order of writes for reading

### Multi-Leader Replication: 
- Explicit (master-master or active/active)

Use Cases:
- Multi-Datacenter Replication

  - Performance improvement over single-leader
  - Tolerance of datacenter outage
  - Tolerance of network partitions
- Clients with offline operator (each client device is a datacenter now)
- Collaborative Editing

Tools: Tungsten Replication (MySQL), BDR (PostgreSQL), Golden Gate (Oracle)

#### Handling Write Conflicts

- **Conflict Detection** (Sync v/s Async)
- **Conflict Avoidance**: Simplest stratergy for dealing with conflicts
- **Converging Toward a Consistent State**:
  - Last write wins
  - Merge values together
  - Defer conflict for some later time resolution
- **Custom logic**: On write (Bucardo) & On read (Couch DB)

- **Automatic Conflict Resolution**:
  - **Conflict-Free Replicated Data Types (CRDTs)** (2-way merge)
  - **Multi-Version Concurrency Control** (3-way merge) Similar to list version control
  - **Operational Transformation** (e.g., Google Docs, Etherpad)
- **Replication Topology**:
  - Circular
  - Star/tree
  - all-to-all (Version vectors can be used)

### Leaderless Replication:
- E.g., DynamoDB (Amazon), Cassandra, Riak, Voldemort

- Read requests are sent to several nodes in parallel and version numbers are used to determine which one is newer
- Data copy mechanism to every node:
  - Read repair: works when client make request
  - Anti-entropy: backgorund process that constantly looks for differences
- **Quorums**: **w** (min replicas to have successful write) **+** **r** (min replicas to be queried for each read) **>** **n** (number of replicas)
- Sloppy Quorum and Hinted Handoff:
  - In large cluster (more than *n* nodes), if quorum is not established due to network intruption, then write to some nodes that are reachable (other than *n*); after intruption is fixed, writes are send to appropriate *n* nodes.
- **Last Write Wins (LWW)**: 
  - cause data loss
  - concurrency detection: happens before 
- Merging concurrently written values (siblings):
  - no data loss
  - either do a union or leave deletion marker (tombstone)
- Colllection of version numbers is called **version vector**


## Partitioning or Sharding

- Main purpose is scalability
- Combining replication and partitioning: Each node acts as a leader for some partitions and a follower for others

- **Hot Spot**: A partition with disproportionately high load (skewed)

### Partitioning by 

- Key Range

  - May not be evenly spaced
  - May require key other than timestamps to avoid hot spots

- Hash of Key

  - A good hash takes skewed data and makes it uniformly distributed (consistent hashing)
  - Disadvantage: Inefficient range queries

#### With secondary indexes, partitioning by:
  - Document (local index)
  - Term (global index)

### (Re)Partitioning Strategies

- **Hash ModuloN**: Wrong way to do as most of the key needs to be moved across nodes
- **Fixed Number of Partitions**
- **Dynamic Partitioning**: Suitable more for hash partitioning than range partitioning
- **Partitioning Proportional to Underlying Node**
- **Automatic or Human-controlled** (good to have human-in-loop)

### Request Routing (Service Discovery)

- **Client Contact Any Node**: Which can forward the request to any appropriate node
- **Partition-aware Load Balancer** (routing tier) (e.g., Zookeeper)
- **Partition-aware client**

Parellel Query Execution

## Transactions

- Grouped several reads and writes together into one logical unit (one operation): either it succeeds (commit) or it fails (abort, rollback) (**no partial failure**)
- **Safety Guaranteed by Transactions**: ACID (Atomicity, Consistency, Isolation, Durability)
  - Systems not following ACID are called BASE (Basically Available, Soft State, and Eventual Consistency)

  - **Consistency**: (property of application) Certain statements about the data (invariants) that must be true (e.g., account balance)

  - **Isolation**: Concurrently executing transactions are isolated from each other (performance is impacted)

  - **Durability**: Once a transaction has committed, any data it has written will not be forgotten, even if there is a hardware fault or the database crashes
- **Single Object Operations**
  - Atomicity using a log for crash recovery 
  - Isolation using lock on each object
  - Complex Atomic Operations
    - Increment operations
    - Compare-and-set operations (allow only if not concurrently changed)

- **Multi-Object Transactions**

  - **Relational Database**: with foreign keys
  - **Document-Based**: each document is a single object
  - **Secondary Indexes**

- Error Handling and Retry: retry after abort?


### Weak Isolation Levels

#### Read Committed
- Guarantees no dirty reads/writes
- When reading from the database, only see data that has been committed
- When writing to the database, only overwrite data that has been committed 

#### Snapshot Isolation
- To prevent read skew
- Using multi-version concurrency control (MVCC)

A typical approach is that the read comitted uses a separate snapshot for each query, while snapshot isolation uses the same snapshot for entire transaction.

#### Preventing lost update problem
- E.g., when write-write conditions
- Atomic write instead of read-modify-write
- Cursor stability (exclusive lock)
- Detecting lost updates
- Compare-and-set

#### Phantoms and write skews
- Solution: materializing conflicts

### Serializability

#### Actual Serial Execution

- A system designed for single-threaded execution can sometimes perform better than a system that supports concurrency because it can avoid the coordination overhead by locking
- However, its throughput is limited to one thread
- **Using Stored Procedures**: Instead of interactive transactions
- Data can be partitioned (depends on the data)

#### Two-Phase Locking:
- Transactions can also block readers and writers unlike snapshot isolation
- **Lock Modes**:
  - Shared mode (read lock)
  - Exclusive mode (write lock)
- transaction throughput and response time of queries are significantly worse than weak isolation (and are more prone to deadlocks)
- **Predicate Locks**: Apply to all objects that match some search condition, rather than particular rows
- **Index-Range Locks**

### Serializable Snapshot Isolation (SSI)

- Optimistic concurrency control
- On top of snapshot isolation, SSI adds an algorithm for determining serialization conflicts among writes and determines which transactions to abort
- Transactions do not need to block waiting for locks held by other transactions

## Dealing with Distributed Systems

### Faults and Partial Failures

- For hardware faults, we prefer a computer to crash completely rather than running wrong results
- Partial failures are non-deterministic
- Fault handling must be part of the software design

### Unreliable Networks

#### Shared-Nothing Systems

- Communicate through the network but cannot directly access each other's memory or disk

#### Detecting Faults: 
- Rapid feedbacks about a remote node's health are useful but cannot be counted upon
- Retry a few times, wait for a timeout, and eventually declare the node dead

#### Network Congestion

- **TCP** performs flow control (congestion avoidance or back pressure) in which a node limits its rate of sending in order to avoid overloading a network link or the receiving node (requires queuing at the sender's end)
- **TCP vs. UDP**: Trade-off between reliability and variability
  - For synchronous networks (like telephone): We have bounded delay (fixed max end-to-end latency) due to circuit switching (no queuing)
  - For TCP (IP, packet-switched protocols) suffers from queuing and thus unbounded delay
  - We can use QoS (Quality of Service, prioritization, scheduling of packets) and admission control to emulate circuit switching on packet networks
- Timeouts have to be defined experimentally

### Unreliable Clocks

#### Two Kinds of Clocks (Physical Clocks)

- **Time-of-Day Clock**

  - Returns the current date and time according to some standard
  - Example: `System.currentTimeMillis()` in Java returns the number of milliseconds since the epoch, midnight UTC, Jan 1, 1970
  - Synchronized with NTP (Network Time Protocol) so it may be forcibly reset or jump back in time

-  Monotonic Clock

    - Suitable to measure duration
    - Example: `System.nanoTime()` in Java
    - NTP may adjust the frequency at which the clock ticks forward (slewing) but cannot make it jump back in time

#### Clock Accuracy

- Can be achieved using GPS receivers, Precision Time Protocol (PTP) with deployment and monitoring

#### Logical Clocks

- Based on Incremental Counters

#### Google TreeTime API in spanner
- Gives confidence interval [earliest, latest] for current time

#### Process Pauses

- Could be due to a lease switch in single-threaded, garbage collector, context switching, etc.
- For multi-threaded data processing systems, real-time guarantees are simply not economical or appropriate

### Truths and Lies
- Many distributed algorithms rely on a quorum, i.e., voting amoing nodes, e.g., to declare if a node is dead
- Fencing token to prevent process pauses, e.g., when a node hasn't yet found but that it's lease has expired
- nodes May lie, e.g.,  if a node may claim to have recieved a particular message when in fact it didn't. This behaviour is known as Byzantine Fault



#### System Model

- Synchronous Model
  - Assumes bounded network delay, bounded process pauses, and bounded clock error
    - Not practical

- Partially Synchronous Model
  - behaves as synch model most of the time


- Asynchronous Model
  - No timing assumptions
  - Does not even have a clock (i.e., no timeout)

#### Fault Model

- Crash-Stop Fault
  - Assumes node can fail only by crashing (once down, never comes back)

- Crash-Recovery Fault
  - Nodes may respond after some time

- Byzantine (Arbitrary) Faults
  - Nodes may lie

## Consistency
### Linearizability

- Also known as atomic consistency, strong consistency, immediate consistency, or external consistency
- Basic idea: Make a system appear as if there were only one copy of the data, and all operations on it are atomic
- Recency guarantee on reads and writes of a register (individual objects), does not prevent write skew
- Multi-leader replication are not linearizable
- Leaderless systems with Dynamo-style replication do not provide linearizability

#### CAP Theorem

- Either consistent or available when partitioned
- Applications that require linearizability can be more tolerant to network problems
- The reason for dropping linearizability is performance and not fault tolerance

### Ordering Guarantees

#### Causality

- The chain of causally dependent operations defines the causal order in the system, i.e., what happened before what
- If a system obeys the ordere imposed by causality, we say that it is causally consistent
- **Total Order**: Allows any two elements to be compared, and we can always determine which one is greater/smaller
- For linearizability, we have total order of operations
- For causality, we have partial order, as we have a term for concurrent operations

#### Sequence Number Ordering (Timestamp Ordering)

- Lamport Timestamps (Counter, Node ID)

#### Total Order Broadcast

- Requires two safety properties to be satisfied:
  - Reliable delivery
  - Total ordered delivery
- The idea of knowing when the total order is captured
- **State Machine Replication**: If every message represents a write to the database and every replica processes the same writes in the same order, then the replicas will remain consistent with each other
- Asynchronous

### Distributed Transactions & Consensus

#### When to Use Consensus

- Leader election
- Atomic commit

#### If an Algorithm is Allowed to Use Timeouts

- Or any other way of identifying suspected crashed nodes, then consensus is solvable (as to get around the impossibility result of FLP)

#### Single-Phase Commit

- The database makes the transaction's writes durable (typically in a write-ahead log) and then appends a commit record to the log on disk
- A transaction commit must be irrevokable (basis of read committed isolation)

#### Two-Phase Commit (2PC)

- **Coordinator** (new component) sends a prepare request to each of the nodes, asking them if they can commit (Phase 1)
  - If all nodes agree, the coordinator sends a commit request to all nodes
  - If any node disagrees, the coordinator sends an abort request to all nodes
- **Commit Point**: Before sending the commit request, the coordinator and the participants will be expected to perform the commit (even if they have to retry)
- If the coordinator fails/crashes after phase 1, the participants need to wait in doubt/uncertain

#### Three-Phase Commit (3PC)

- Assumes a network with bounded delay and nodes with bounded response time

#### Distributed Transactions
- Two types:
  - **Database Internal Distributed Transaction**
  - **Heterogenous Distributed Transaction**
- **XA Transaction (Extended Architecture)**: Implements 2PC with heterogeneous technologies

#### Fault-Tolerant Consensus

- A consensus algorithm satisfies:
  - **Uniform Agreement**: No two nodes decide differently
  - **Integrity**: No node decides twice
  - **Validity**
  - **Termination**: Every node that does not crash eventually decides some value

- Most implementations of consensus ensure that the safety properties are always met
- Assumes no Byzantine failures, i.e., if a node does not follow the protocol, it may break the safety properties of the protocol
- Most fault-tolerant consensus algorithms (e.g., Paxos, Raft, Zab) are total order broadcast algorithms, so they decide on a sequence of values
  - Total order broadcast is equivalent to repeated rounds of consensus

To avoid split brain in case of single-leader replication, consensus is needed to elect a leader

#### Consensus Protocols

- Do not guarantee that the leader is unique; but they can make a weaker guarantee, using 'epoch number' and guarantee within each epoch, the leader is unique
- Before a leader is allowed to decide anything, it must first check that there's no other leader with a higher epoch number
- Thus, we have quorum of votes from nodes
- These votes are kind of synchronous

#### Zookeeper's Features

- Linearizable atomic operations
- Total ordering of operations
- Failure detection
- Change notification


---

# Dervied Data
- Two categories of system:
  - **System of records** (source of truth, normalized)
  - **Derived Data** (reduntant, denormalized)
    - *Services (online systems)*: Measure of performance: response time and availability
    - *Batch processsing (offline)*: Measure of performance: thorughput time
    - *Streaming processing (near real-time system)*

## Batch Processing
- Unix tools: awk, sed, grep, sort, uniq, xengs
  - e.g., to find 5 most popular pages on website sing nginx default access log
    
    ```cat/var/log/nginx/access.log awk '{print $7}' | sort uniq -c  sort -nr head -n 5```
- the sort utility in GNU coreutils automatically handles larger-than-memory datasets by splilling to disk and automatically parallelizes sorting across multiple CPU cores.
- the biggest delimitation of Unix is that they run only on single machine
- Unix doesn't modify the niput files

### HDFS (Hadoop Distributed File System): MapReduce

- HDFS is based on shared-nothing principle, in contrast to shared-disk approach of Network Attached Storage (NAS) and Storage Area Network (SAN) architectures
- Consists of a daemon process running on each machine to allow other nodes to access files stored on that machine, a central server called 'NameNode' keeps track of which file blocks are stored on which machine
- Replication: Copied files or using erasure coding

#### Steps for MapReduce

1. Read input files and break them up into records (line separator: \n)
2. Call mapper function to extract key-value pairs
3. Sort all key-value pairs by key
4. Call reduce function

- Number of mapper tasks is determined by the number of input blocks, number of reducer tasks is configured by users
- Sorting is performed in stages
- MapReduce jobs are chained (without intermediate outputs written to temporary files)

#### Reduce-Side Join/Aggregation

- **Sort-Merge Join**: Mapper output is sorted by key, and reducers then merge together the sorted lists of records from both sides of the join (using secondary sort by, e.g., first by user ID, then by timestamp)
  - Using mapReduce programming model has separated the phisycal netwoek communication aspects of the computation (getting the data to the right machine) from the application logic (processing the data once you have it)
  - disproportionately active database records known as linchpin objects or hot keys for 'bringing all records with same key to the same place' when large amount of data related to a single key, this creates skew

#### **Map-Side Join**
- If we can make certain assumptions about some input data, it is possible to make joins faster

- **Broadcast Hash Join**: For joining large datasets to small datasets

- **Partitioned Hash Joins (or Bucketed Map Joins)**: Only works if both of the join's inputs have the same number of partitions, with records assigned to partitions based on the same key and same hash function

- The output of a reducer side join is partitioned and sorted by the join key whereas the output of a map-join is partitioned and sorted in the same way as the large input

#### Output of Batch Workflows
-  there can be issues, when the output is directly written to datbase server, instead the batch job is preferred and write it as files to the job's output directory in the distributed file system
- By treating inputs as immutable and avoiding side-effecs, benefits:
  - human fault tolerance,
  - minimizing irreversibility (easy rollback),
  - automatic reschedule of failed tasks,
  - separation of concerns, and
  - enables reuse of code

#### Hadoop compared with distributed DBs
- MPP (Massively Parallel processing) 
  - DBs focus on parallel executton of analytic SQL queries on a cluster of machines, while the combo of MapReduce and a distributed file system provides something much more like a general-purpose OS that can run any arbitary program
- Diversity of processing models
  - allows model such as SQL (from Hive) built on top of hadoop
  - neither HBase or Impala uses MapReduce but both use HDFS for storage
- Design for frequent faults

### Beyond Map Reduce
- The process of writing out intermediate state of files is called **Materialization**.
- MapReduce jobs are separated

#### Data Flow Engines

- Examples: Spark, Tez, Flink
- Handle the entire workflow as one job rather than breaking it up into independent operations
- Use functions called operators rather than alternating map and reduce

#### Advantages Over MapReduce

- No sorting required between map and reduce stages
- Map stage can be combined with preceding reduce
- Locality optimization
- Less I/O (no materialization)
- No wait for operations, and no new JVM

Fault tolerance in the absence of materialization
  - Recomputation from the data is done
  - Example: Spark uses RDD (Resilient Distributed Dataset), better to make operations deterministic

## Stream Processing

- An event is generated once by producers (publishers/senders), then potentially processed by multiple consumers/subscribers/recepients
- Related events are grouped together into topics or streams
- Continuous polling the datastore for new data is expensive, so some notification mechanism (triggers) are needed, i.e.,

### Messaging Systems

#### Publish/Subscribe Model

- Two questions:
  - Producers send faster than consumers can consume
    - Drop messages
    - Queues
    - Back pressure
  - Node crash (temporary offline) - lost messages

#### Direct Messaging

- Examples: UDP multicast, ZeroMQ (brokerless over TCP/IP multicast), StatsD & BruBeck (metrics over UDP), direct HTTP or RPC calls (webhooks)

#### Message Broker/Queue

- Consumers are asynchronous
- Some message queues use 2-phase commit using XA/JTA
- For multiple consumers, two properties:
  - **Load Balancing**: Sharing work of consuming a topic among consumers
  - **Fanout**
- **Acknowledgment by Broker**: A client sendsit when it has finished processing a message, so that the broker can remove the message from the queue

#### Partition Logs (Log-Based Brokers)

- Hybrid approach, combining the durable stores of databases within the low-latency notification facilities of messaging
- Examples: Apache Kafka, Amazon Kinesis Streams, Twitter, Google Cloud Pub/Sub (with JMS-like API)
- Uses offset for every message within each partition
- No need for tracking acknowledgment for every message, just periodic check of consumer offset
- Hence, reduce bookkeeping and increase throughput

### Databases & Streams

#### Keeping Systems in Sync

- Full database dumps are slower; alternative is dual write, code explicitly writes to each system when data changes (e.g., first to DB, then to search index)
- But this can lead to race conditions

#### Change Data Capture (CDC)

- Process of observing all data changes written to a database and extracting them in a form in which they can be replicated to other systems
  - Using async database triggers
  - Log compaction: Log records with primary key and periodically throw away duplicates
#### Event sourcing
- The application logic is explicitly built on the basis of immutable events that are written to an event log

### Processing Streams

- **Complex Event Processing (CEP)**: For searching specific patterns
- **Stream Analytics**: Uses probabilistic algorithms
- **Materialized views** refer to aggregates (e.g., data cube)
- **Search on streams** (queries are stored, documents run past the query, like CEP)
- **Message passing** or RPC

#### Timestamps

- **Event Time**: The time at which the event occurred, according to the device clock
- **Processing Time**: The time at which the event was sent to the driver, according to the device clock
- **Ingestion Time**: The time at which the event was received by the server, according to the server clock

#### Types of Windows

- **Tumbling Window**: Fixed length, each event belongs to one window
- **Hopping Window**: Fixed length, windows can overlap (smoothing)
- **Sliding Window**: Contains all events that occur within some interval of time
- **Session Window**: Group all events for the same user that occur closely in time

#### Stream Joins

- **Stream-Stream Join (Window Join)**
- **Stream-Table Join (Stream Enrichment)**
- **Table-Table Join (Materialized View Join)**

Problems with Time: Slowly changing dimension

#### Fault Tolerance

- Microbatching and checkpoints
- Stream commit
- Replayability
