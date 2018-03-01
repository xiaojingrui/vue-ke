import Mock from 'mockjs'

Mock.setup({
  timeout: 500
})

Mock.mock(/\/xxx\/autoQuery/, function(options) {
  let params = JSON.parse(options.body)
  let maps = {
    1: {
      errCode: 0,
      data: {
        creationDate: '2017-06-21',
        currentProgress: '失败',
        loanAmount: '5000',
        loanLimit: '6',
        rate: '24%'
      }
    },
    2: {
      errCode: 0,
      data: {
        availableBalance: '@integer(100,1000)'
      }
    },
    3: {
      errCode: 0,
      'data|3': [
        {
          currentNum: '@integer(1,5)',
          date: '11月20日',
          'payStatus|1': ['1', '2'],
          payableAmount: '1651.48',
          totalNum: '@integer(6,10)'
        }
      ]
    },
    4: {
      errCode: 0,
      data: {
        amount: 3244,
        cashTime: '2017-12-26 24点前',
        orderStatus: '在途'
      }
    }
  }
  return Mock.mock(maps[params.type])
})
