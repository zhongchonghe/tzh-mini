export const format = {
	methods: {
		formatPrice(type, a, b, c, d) {
			switch (type) {
				case 1:
					//数值保留2位小数
					var f = parseFloat(a);
					if (isNaN(f)) {
						return false;
					}
					var f = Math.round(a * 100) / 100;
					var s = f.toString();
					var rs = s.indexOf('.');
					if (rs < 0) {
						rs = s.length;
						s += '.';
					}
					while (s.length <= rs + 2) {
						s += '0';
					}
					return s;
					break;
				case 2:
					return parseInt(a * 100 - b * 100) / 100 //
					break;
				case 3:
					return parseInt(a * 100) / 100
					break;
				case 4:

					break;
				case 5:
					break;
			}
		}
	}
}
