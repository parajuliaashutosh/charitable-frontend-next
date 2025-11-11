genProto:
	protoc -I=src/transport/gateway/gRPC/proto --plugin=node_modules/.bin/protoc-gen-ts --ts_opt=optimize_code_size,long_type_number --ts_out=src/transport/gateway/gRPC/stubs src/transport/gateway/gRPC/proto/*.proto
