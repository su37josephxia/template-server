
import { RemoveSensitiveUserInfoInterceptor } from '../remove-sensitive-info.interceptor';

describe('RemoveSensitiveUserInfoInterceptor', () => {
    it('should be run', () => {
        const re = new RemoveSensitiveUserInfoInterceptor()

        expect(re.delValue({ b: 1 }, 'a')).toEqual({ b: 1 })

        expect(re.delValue({ b: 1, a: 1 }, 'a')).toEqual({ b: 1 })

        expect(re.delValue({ b: 1, c: { a: 1 } }, 'a')).toEqual({ b: 1, c: {} })

        expect(re.delValue({ b: 1, a: { c: 1 } }, 'a')).toEqual({ b: 1 })
    })
})