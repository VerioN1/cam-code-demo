import {useEffect} from 'react';
import {getCustomTheme} from '@/services/customTheme.service';
import {useLocalStorage} from '@mantine/hooks';
import useCustomTheme from '@/hooks/useCustomTheme';

const useFetchTheme = (currentParamState?: { customThemeId: string }, setIsLoading?: Function | undefined) => {
	const {setCustomStyle} = useCustomTheme();
	const [recentCustomThemeId, setRecentCustomThemeId] = useLocalStorage({
		key: 'ct-id',
		defaultValue: currentParamState?.customThemeId
	});
	useEffect(() => {
		(async () => {
			try {
				if (!currentParamState?.customThemeId) {
					const {data}: any = await getCustomTheme(recentCustomThemeId);
					setCustomStyle(data);
				} else if (recentCustomThemeId !== currentParamState.customThemeId) {
					setRecentCustomThemeId(currentParamState.customThemeId);
					const {data}: any = await getCustomTheme(currentParamState.customThemeId);
					setCustomStyle(data);
				} else {
					const {data}: any = await getCustomTheme(currentParamState.customThemeId);
					setCustomStyle(data);
				}
			} catch (e) {
				console.log(e);
			}
			setIsLoading ? setIsLoading(false) : null;
		})();
	}, []);
};
export default useFetchTheme;
