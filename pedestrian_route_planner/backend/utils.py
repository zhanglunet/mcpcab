import os
import requests
import json
from dotenv import load_dotenv

# 加载环境变量
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', '.env'))

# 获取百度地图API密钥
BAIDU_API_KEY = os.getenv('BAIDU_MAPS_API_KEY')

def geocode(address):
    """
    使用百度地图API将地址转换为坐标
    
    参数:
        address (str): 需要转换的地址
        
    返回:
        tuple: (经度, 纬度) 坐标元组，如果转换失败则返回None
    """
    if not address or not isinstance(address, str):
        raise ValueError("地址必须是非空字符串")
        
    if not BAIDU_API_KEY:
        raise ValueError("未找到百度地图API密钥，请检查环境变量配置")
    
    # 百度地图地理编码API URL
    url = f"http://api.map.baidu.com/geocoding/v3/?address={address}&output=json&ak={BAIDU_API_KEY}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # 如果请求失败，抛出异常
        
        data = response.json()
        
        # 检查API返回状态
        if data['status'] == 0:  # 0表示成功
            location = data['result']['location']
            return (location['lng'], location['lat'])  # 返回经度和纬度
        else:
            print(f"地理编码失败: {data['message']}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"请求错误: {e}")
        return None
    except (KeyError, json.JSONDecodeError) as e:
        print(f"解析响应失败: {e}")
        return None

# 测试函数
def test_geocode():
    """
    测试地理编码功能
    """
    test_addresses = [
        "北京市海淀区清华大学",
        "上海市浦东新区陆家嘴",
        "广州市天河区天河路385号"
    ]
    
    print("开始测试地理编码功能...")
    for address in test_addresses:
        print(f"\n测试地址: {address}")
        try:
            result = geocode(address)
            if result:
                print(f"地理编码结果: 经度={result[0]}, 纬度={result[1]}")
            else:
                print("地理编码失败，未获取到坐标")
        except Exception as e:
            print(f"测试出错: {e}")
    
    print("\n地理编码功能测试完成")

# 如果直接运行此文件，执行测试
if __name__ == "__main__":
    test_geocode()