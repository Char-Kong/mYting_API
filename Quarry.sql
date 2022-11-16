<mapper namespace="data.mybatis.mapper.PartyMapper">
	<insert id="insertParty" parameterType="com.spring.ott.vo.PartyVo">
	  	<selectKey keyProperty="party_id" resultType="int" order="BEFORE">
    		select seq_party.nextval FROM DUAL
    	</selectKey>
		insert into party values
		(#{party_id},#{ott_id},#{leader},0,NULL,0,#{share_id},#{share_pwd},sysdate+30,sysdate)
	</insert>

	<select id="getMyParty" parameterType="int" resultType="com.spring.ott.vo.PartyVo">
		select * from party 
		where ott_id = #{ott_id} and party_state = 0 and rownum = 1 and <![CDATA[member_num < 3]]>
		order by start_day
	</select>
	
	<select id="checkInvite" parameterType="string" resultType="com.spring.ott.vo.PartyVo">
		select * from party where invite_code = #{invite_code} 
	</select>
	
	<select id="matchingCheck" parameterType="string" resultType="com.spring.ott.vo.PartyVo">
		select * from party where leader = #{user_id} and party_state != 3
	</select>
		
	<update id="memberUpdate" parameterType="hashmap">
		update party set member_num = member_num + (#{input_num}) where party_id = #{party_id}
	</update>
	
	<update id="stateUpdate" parameterType="hashmap">
		update party set party_state = #{party_state} where party_id = #{party_id}
	</update>
	
	<select id="checkPaymentState" resultType="int">
		select count(payment_id) from matching
	</select>
	
	<select id="weekMatching" resultType="int">
		select count(*) from party where PARTY_STATE = 1 and start_day >= TO_CHAR(sysdate-7,'YYYYMMDD')
	</select>

</mapper>