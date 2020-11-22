# ELK
## Docs
[Elasticsearch][1e]  
[Logstash][3l]  
[Filebeat][2f]  
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
`server/elk/lake-pipeline.conf`  
[Dissect Filter](https://www.elastic.co/guide/en/logstash/current/plugins-filters-dissect.html)

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
[3l]: https://www.elastic.co/guide/en/logstash/current/index.html