#!/bin/bash
ffmpeg -y -i rtsp://192.168.88.181:554/user=admin_password=_channel=2_stream=0.sdp -vframes 1 /public/images/thumb.jpg
	