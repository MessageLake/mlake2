# ELK
## Docs
[Elasticsearch][1e]  
[Filebeat][2f]
[Logstash][3l]
## Architecture
MessageLake --(write to)--> Buffer File --(ingested by)--> Filebeat --(parsed by)--> Logstash --(saved to)--> Elasticsearch
## Elasticsearch
### Locations
```
/etc/elasticsearch
  /elasticsearch.yml
/etc/default/elasticsearch <-- text file w/path settings
/usr/share/elasticsearch
  /bin
/var/lib/elasticsearch
/var/log/elasticsearch
```
### Start/Stop
`systemctl [start|stop] elasticsearch`

## Logstash
### Locations
```
/etc/logstash
  /logstash.yml
  /pipelines.yml
/usr/share/logstash
  /bin
/var/lib/logstash
/var/log/logstash
```
### Start/Stop
`systemctl [start|stop] elasticsearch`
### Pipelines

## Filebeat
### Locations
```
/etc/filebeat
  /filebeat.yml
/usr/share/filebeat
  /bin/
/var/lib/filebeat
/var/log/filebeat
```
### Modules
`/etc/filebeat/modules.d/`
`filebeats modules enable elasticsearch`
### Start/Stop
`systemctl [start|stop] filebeat`



[1e]: https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
[2f]: https://www.elastic.co/guide/en/beats/filebeat/current/index.html