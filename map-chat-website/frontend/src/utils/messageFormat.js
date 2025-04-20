/**
 * 消息格式化工具
 * 处理聊天消息的格式化和解析
 */

/**
 * 解析消息中的位置信息，提取坐标和地址
 * @param {String} text - 消息文本
 * @returns {Object|null} 位置信息对象或null
 */
export function extractLocationInfo(text) {
  if (!text) return null;
  
  // 匹配坐标格式 (xx.xxxx, yy.yyyy)
  const coordPattern = /\((\d+\.\d+),\s*(\d+\.\d+)\)/;
  const coordMatch = text.match(coordPattern);
  
  if (coordMatch) {
    return {
      lng: parseFloat(coordMatch[1]),
      lat: parseFloat(coordMatch[2]),
      raw: coordMatch[0]
    };
  }
  
  // 如果没有找到坐标，尝试识别地址
  // 这里只是一个简单示例，实际应用中可能需要更复杂的地址识别逻辑
  const addressPattern = /地址[:：](.+?)(?:,|，|。|$)/;
  const addressMatch = text.match(addressPattern);
  
  if (addressMatch) {
    return {
      address: addressMatch[1].trim(),
      raw: addressMatch[0]
    };
  }
  
  return null;
}

/**
 * 解析消息中的时间信息
 * @param {String} text - 消息文本
 * @returns {Object|null} 时间信息对象或null
 */
export function extractTimeInfo(text) {
  if (!text) return null;
  
  // 匹配时间格式 HH:MM 或 HH点MM分
  const timePattern = /(\d{1,2})[:\s点](\d{1,2})(?:分|:|：)?/;
  const timeMatch = text.match(timePattern);
  
  if (timeMatch) {
    return {
      hour: parseInt(timeMatch[1]),
      minute: parseInt(timeMatch[2]),
      raw: timeMatch[0]
    };
  }
  
  return null;
}

/**
 * 解析消息中的日期信息
 * @param {String} text - 消息文本
 * @returns {Object|null} 日期信息对象或null
 */
export function extractDateInfo(text) {
  if (!text) return null;
  
  // 匹配日期格式 YYYY-MM-DD 或 YYYY年MM月DD日
  const datePattern = /(\d{4})[-年/](\d{1,2})[-月/](\d{1,2})日?/;
  const dateMatch = text.match(datePattern);
  
  if (dateMatch) {
    return {
      year: parseInt(dateMatch[1]),
      month: parseInt(dateMatch[2]),
      day: parseInt(dateMatch[3]),
      raw: dateMatch[0]
    };
  }
  
  // 匹配相对日期，如"明天"、"后天"等
  const relativeDatePattern = /(今天|明天|后天|大后天)/;
  const relativeDateMatch = text.match(relativeDatePattern);
  
  if (relativeDateMatch) {
    const today = new Date();
    let dayOffset = 0;
    
    switch (relativeDateMatch[1]) {
      case '今天':
        dayOffset = 0;
        break;
      case '明天':
        dayOffset = 1;
        break;
      case '后天':
        dayOffset = 2;
        break;
      case '大后天':
        dayOffset = 3;
        break;
    }
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayOffset);
    
    return {
      year: targetDate.getFullYear(),
      month: targetDate.getMonth() + 1,
      day: targetDate.getDate(),
      raw: relativeDateMatch[0],
      isRelative: true
    };
  }
  
  return null;
}

/**
 * 从文本中提取数字
 * @param {String} text - 消息文本
 * @returns {Array} 提取的数字数组
 */
export function extractNumbers(text) {
  if (!text) return [];
  
  const numbers = [];
  const matches = text.match(/\d+(\.\d+)?/g);
  
  if (matches) {
    matches.forEach(match => {
      numbers.push(parseFloat(match));
    });
  }
  
  return numbers;
}

/**
 * 高亮消息中的关键信息
 * @param {String} text - 消息文本
 * @param {Array} keywords - 要高亮的关键词数组
 * @returns {String} 带有HTML高亮标记的文本
 */
export function highlightKeywords(text, keywords) {
  if (!text || !keywords || keywords.length === 0) return text;
  
  let highlightedText = text;
  
  keywords.forEach(keyword => {
    if (!keyword) return;
    
    const regex = new RegExp(keyword, 'gi');
    highlightedText = highlightedText.replace(regex, match => `<span class="highlight">${match}</span>`);
  });
  
  return highlightedText;
}

/**
 * 将纯文本消息转换为支持HTML的格式
 * @param {String} text - 纯文本消息
 * @returns {String} 支持HTML格式的消息
 */
export function formatMessageText(text) {
  if (!text) return '';
  
  // 转义HTML特殊字符
  let formattedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // 将URL转换为可点击的链接
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  formattedText = formattedText.replace(urlPattern, url => `<a href="${url}" target="_blank">${url}</a>`);
  
  // 将换行符转换为<br>标签
  formattedText = formattedText.replace(/\n/g, '<br>');
  
  return formattedText;
}

/**
 * 从消息中提取查询意图
 * @param {String} text - 消息文本
 * @returns {Object} 提取的意图信息
 */
export function extractQueryIntent(text) {
  if (!text) return { type: 'unknown' };
  
  // 检查是否是位置查询
  if (/在哪里|在哪儿|怎么走|位置|地址|附近/.test(text)) {
    return {
      type: 'location',
      query: text
    };
  }
  
  // 检查是否是周边查询
  if (/附近的|周边的|附近有(没有)?什么|周边有(没有)?什么/.test(text)) {
    const poiTypeMatch = text.match(/(.*?)(?:附近的|周边的)(.*?)(?:在哪里|在哪儿|有哪些)/);
    if (poiTypeMatch) {
      return {
        type: 'around',
        locationName: poiTypeMatch[1].trim(),
        poiType: poiTypeMatch[2].trim(),
        query: text
      };
    }
    
    return {
      type: 'around',
      query: text
    };
  }
  
  // 检查是否是路线规划
  if (/怎么(从|到)|从.*到.*怎么走|.*到.*路线/.test(text)) {
    const routeMatch = text.match(/从(.*?)到(.*?)怎么走/);
    if (routeMatch) {
      return {
        type: 'route',
        origin: routeMatch[1].trim(),
        destination: routeMatch[2].trim(),
        query: text
      };
    }
    
    return {
      type: 'route',
      query: text
    };
  }
  
  // 检查是否是天气查询
  if (/天气怎么样|天气如何|天气预报/.test(text)) {
    const cityMatch = text.match(/(.*?)(?:的|今天|明天|后天|周|星期).*?天气/);
    if (cityMatch) {
      return {
        type: 'weather',
        city: cityMatch[1].trim(),
        query: text
      };
    }
    
    return {
      type: 'weather',
      query: text
    };
  }
  
  // 未识别的查询类型
  return {
    type: 'general',
    query: text
  };
} 