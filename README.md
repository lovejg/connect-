**코드는 branch를 main으로 바꾸셔야 볼 수 있습니다**

producer가 kafka에 write한 데이터를 consumer 측에서 kafka에서 다시 받아와서, 이를 firebase의 realtime database에 추가해주는 코드.
producer는 성능과 실시간성을 고려하여 python으로 구현, consumer는 firebase로의 접근성이나 백엔드가 대부분 js로 이루어져 있다는 점을 고려하여 js로 구현.

현재는 데이터를 받아 parsing 해서(간단히 만들어놓음) firebase DB에 넣도록 임의로 구현해놓은 상태. 추후 토의를 통해 딥러닝 모델에서 나온 데이터를 어떤식으로 txt 파일에
저장할 지를 정한 뒤에, 해당 txt 데이터를 parsing을 통해 firebase DB에 알맞는 형태로 저장하도록 parsing 부분 코드를 수정할 예정
